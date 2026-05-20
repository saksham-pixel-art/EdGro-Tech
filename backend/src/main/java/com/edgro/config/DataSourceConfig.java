package com.edgro.config;

import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
@Profile("prod")
public class DataSourceConfig {

    private static final Logger log = LoggerFactory.getLogger(DataSourceConfig.class);

    @Bean
    @Primary
    public DataSource dataSource(DataSourceProperties properties) {
        String rawUrl = properties.getUrl();
        if (rawUrl == null || rawUrl.isBlank()) {
            rawUrl = properties.determineUrl();
        }
        if (rawUrl == null || rawUrl.isBlank()) {
            rawUrl = System.getenv("DATABASE_URL");
        }

        if (rawUrl == null || rawUrl.isBlank()) {
            log.info("Database URL is not set. Using default Spring datasource configuration.");
            return properties.initializeDataSourceBuilder().type(HikariDataSource.class).build();
        }

        try {
            if (rawUrl.startsWith("mysql://")) {
                log.info("Detected mysql:// URL format. Parsing into JDBC URL...");
                URI uri = new URI(rawUrl);
                String host = uri.getHost();
                int port = uri.getPort();
                if (port == -1) {
                    port = 3306;
                }
                String path = uri.getPath(); // starts with '/'
                String databaseName = (path != null && path.length() > 1) ? path.substring(1) : "";

                String jdbcUrl = "jdbc:mysql://" + host + ":" + port + "/" + databaseName;
                
                // Keep query params if present, otherwise set standard production settings
                String query = uri.getQuery();
                if (query != null && !query.isBlank()) {
                    jdbcUrl += "?" + query;
                } else {
                    jdbcUrl += "?useSSL=true&requireSSL=true&verifyServerCertificate=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";
                }

                String username = properties.getUsername();
                String password = properties.getPassword();

                String userInfo = uri.getUserInfo();
                if (userInfo != null && userInfo.contains(":")) {
                    String[] parts = userInfo.split(":", 2);
                    if (username == null || username.isBlank()) username = parts[0];
                    if (password == null || password.isBlank()) password = parts[1];
                } else if (userInfo != null) {
                    if (username == null || username.isBlank()) username = userInfo;
                }

                log.info("Configuring HikariDataSource with parsed JDBC URL: {}", jdbcUrl);
                
                HikariDataSource dataSource = new HikariDataSource();
                dataSource.setJdbcUrl(jdbcUrl);
                dataSource.setUsername(username);
                dataSource.setPassword(password);

                // Production-ready connection pool settings
                dataSource.setMaximumPoolSize(20);
                dataSource.setMinimumIdle(5);
                dataSource.setConnectionTimeout(30000);
                dataSource.setIdleTimeout(600000);
                dataSource.setMaxLifetime(1800000);
                
                return dataSource;
            } else {
                log.info("Database URL is in standard format ({}). Delegating to Spring builder.", rawUrl);
                return properties.initializeDataSourceBuilder().type(HikariDataSource.class).build();
            }
        } catch (URISyntaxException e) {
            log.error("Failed to parse database URL: {}", rawUrl, e);
            throw new IllegalArgumentException("Invalid database URL format", e);
        }
    }
}
