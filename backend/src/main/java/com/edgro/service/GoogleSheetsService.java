package com.edgro.service;

import com.edgro.model.Lead;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

/**
 * Appends a new row to a Google Sheet via the Sheets REST API v4.
 *
 * Authentication: Service Account access token obtained from the
 * Google OAuth2 token endpoint using a JSON key file path configured
 * via the GOOGLE_SA_KEY_PATH environment variable.
 *
 * The spreadsheet must have the service account email granted
 * "Editor" access.
 */
@Service
public class GoogleSheetsService {

    private static final Logger log = LoggerFactory.getLogger(GoogleSheetsService.class);
    private static final DateTimeFormatter TIMESTAMP_FMT =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private static final java.time.ZoneId IST_ZONE = java.time.ZoneId.of("Asia/Kolkata");
    private static final java.time.ZoneId UTC_ZONE = java.time.ZoneId.of("UTC");

    /** Full URL: https://sheets.googleapis.com/v4/spreadsheets/{id}/values/{range}:append?... */
    private static final String APPEND_URL =
            "https://sheets.googleapis.com/v4/spreadsheets/%s/values/%s:append" +
            "?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS";

    private final RestTemplate restTemplate;
    private final GoogleTokenService tokenService;

    @Value("${app.google.sheets.spreadsheet-id:}")
    private String spreadsheetId;

    @Value("${app.google.sheets.sheet-name:Leads}")
    private String sheetName;

    @Value("${app.google.sheets.enabled:false}")
    private boolean enabled;

    public GoogleSheetsService(RestTemplate restTemplate, GoogleTokenService tokenService) {
        this.restTemplate = restTemplate;
        this.tokenService = tokenService;
    }

    /**
     * Appends a lead as a new row in the configured Google Sheet.
     * Throws RuntimeException on failure so the caller can update sync_status = FAILED.
     */
    public void appendLead(Lead lead) {
        if (!enabled) {
            log.debug("Google Sheets sync is disabled — skipping lead id={}", lead.getId());
            return;
        }
        if (spreadsheetId == null || spreadsheetId.isBlank()) {
            throw new IllegalStateException("app.google.sheets.spreadsheet-id is not configured");
        }

        String token = tokenService.getAccessToken();
        String url = String.format(APPEND_URL, spreadsheetId, sheetName + "!A1");

        // Build the row — columns must match the spreadsheet header order exactly:
        // Timestamp | Full Name | Email | Mobile Number | Course | State | City | Preferred University | Source
        
        String formattedTimestamp = "";
        if (lead.getCreatedAt() != null) {
            // Server runs in UTC, convert to IST for Google Sheets
            formattedTimestamp = lead.getCreatedAt()
                    .atZone(UTC_ZONE)
                    .withZoneSameInstant(IST_ZONE)
                    .format(TIMESTAMP_FMT);
        }

        List<Object> row = List.of(
                formattedTimestamp,
                nullSafe(lead.getName()),
                nullSafe(lead.getEmail()),
                nullSafe(lead.getPhone()),
                nullSafe(lead.getCourseInterest()),
                nullSafe(lead.getState()),
                nullSafe(lead.getCity()),
                nullSafe(lead.getPreferredUniversity()),
                nullSafe(lead.getSource())
        );

        Map<String, Object> body = Map.of("values", List.of(row));

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Sheets API returned " + response.getStatusCode()
                    + ": " + response.getBody());
        }

        log.info("Lead id={} appended to Google Sheet successfully", lead.getId());
    }

    private String nullSafe(String value) {
        return value != null ? value : "";
    }
}
