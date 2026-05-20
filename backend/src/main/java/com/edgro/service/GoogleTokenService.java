package com.edgro.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Obtains a short-lived Google OAuth2 access token for the configured
 * service account. Tokens are cached for 55 minutes (Google issues 60-min tokens).
 *
 * Required env vars:
 *   GOOGLE_SA_KEY_PATH  — absolute path to the service account JSON key file
 *
 * The service account JSON key must be granted "Editor" access to your spreadsheet.
 */
@Service
public class GoogleTokenService {

    private static final Logger log = LoggerFactory.getLogger(GoogleTokenService.class);
    private static final String TOKEN_URL = "https://oauth2.googleapis.com/token";
    private static final String SCOPE = "https://www.googleapis.com/auth/spreadsheets";
    private static final long TOKEN_TTL_SECONDS = 3600L;
    private static final long CACHE_BUFFER_SECONDS = 300L; // refresh 5 min before expiry

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${app.google.service-account-key-path:}")
    private String keyPath;

    @Value("${app.google.service-account-key-json:}")
    private String keyJsonContent;

    // Simple in-memory token cache
    private final Map<String, Object> tokenCache = new ConcurrentHashMap<>();

    public GoogleTokenService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public String getAccessToken() {
        // Return cached token if still valid
        String cached = (String) tokenCache.get("token");
        Long expiry = (Long) tokenCache.get("expiry");
        if (cached != null && expiry != null && Instant.now().getEpochSecond() < expiry) {
            return cached;
        }

        try {
            // Parse service account JSON key
            JsonNode keyJson = readServiceAccountJson();
            String clientEmail = keyJson.get("client_email").asText();
            String privateKeyPem = keyJson.get("private_key").asText();

            // Build signed JWT assertion
            PrivateKey privateKey = parsePrivateKey(privateKeyPem);
            long now = Instant.now().getEpochSecond();

            String jwt = Jwts.builder()
                    .setIssuer(clientEmail)
                    .setSubject(clientEmail)
                    .setAudience(TOKEN_URL)
                    .claim("scope", SCOPE)
                    .setIssuedAt(new Date(now * 1000))
                    .setExpiration(new Date((now + TOKEN_TTL_SECONDS) * 1000))
                    .signWith(privateKey, SignatureAlgorithm.RS256)
                    .compact();

            // Exchange JWT for access token
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
            form.add("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer");
            form.add("assertion", jwt);

            ResponseEntity<JsonNode> response = restTemplate.exchange(
                    TOKEN_URL, HttpMethod.POST,
                    new HttpEntity<>(form, headers), JsonNode.class);

            if (response.getBody() == null || !response.getBody().has("access_token")) {
                throw new RuntimeException("Token response missing access_token: " + response.getBody());
            }

            String accessToken = response.getBody().get("access_token").asText();
            long expiresIn = response.getBody().has("expires_in")
                    ? response.getBody().get("expires_in").asLong()
                    : TOKEN_TTL_SECONDS;

            // Cache with buffer
            tokenCache.put("token", accessToken);
            tokenCache.put("expiry", Instant.now().getEpochSecond() + expiresIn - CACHE_BUFFER_SECONDS);

            log.debug("Obtained new Google access token for {}", clientEmail);
            return accessToken;

        } catch (Exception e) {
            throw new RuntimeException("Failed to obtain Google access token: " + e.getMessage(), e);
        }
    }

    private JsonNode readServiceAccountJson() throws Exception {
        if (keyJsonContent != null && !keyJsonContent.isBlank()) {
            return objectMapper.readTree(keyJsonContent);
        }
        if (keyPath == null || keyPath.isBlank()) {
            throw new IllegalStateException("Set GOOGLE_SA_KEY_JSON or GOOGLE_SA_KEY_PATH");
        }
        return objectMapper.readTree(new File(keyPath));
    }

    private PrivateKey parsePrivateKey(String pem) throws Exception {
        String stripped = pem
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replaceAll("\\s+", "");
        byte[] keyBytes = Base64.getDecoder().decode(stripped.getBytes(StandardCharsets.UTF_8));
        PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);
        return KeyFactory.getInstance("RSA").generatePrivate(spec);
    }
}
