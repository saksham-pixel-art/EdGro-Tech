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

        if (rawUrl.startsWith("mysql://")) {
            log.info("Detected mysql:// URL format. Parsing into JDBC URL manually...");
            
            try {
                String withoutScheme = rawUrl.substring("mysql://".length());

                int slashIndex = withoutScheme.indexOf('/');
                int questionIndex = withoutScheme.indexOf('?');
                
                int endOfAuthority = withoutScheme.length();
                if (slashIndex != -1 && questionIndex != -1) {
                    endOfAuthority = Math.min(slashIndex, questionIndex);
                } else if (slashIndex != -1) {
                    endOfAuthority = slashIndex;
                } else if (questionIndex != -1) {
                    endOfAuthority = questionIndex;
                }

                String authority = withoutScheme.substring(0, endOfAuthority);
                
                int atIndex = authority.lastIndexOf('@');
                String userInfo = "";
                String hostPort = authority;

                if (atIndex != -1) {
                    userInfo = authority.substring(0, atIndex);
                    hostPort = authority.substring(atIndex + 1);
                }

                String username = properties.getUsername();
                String password = properties.getPassword();

                if (!userInfo.isEmpty()) {
                    int colonIndex = userInfo.indexOf(':');
                    if (colonIndex != -1) {
                        String u = userInfo.substring(0, colonIndex);
                        String p = userInfo.substring(colonIndex + 1);
                        if (username == null || username.isBlank()) username = u;
                        if (password == null || password.isBlank()) password = p;
                    } else {
                        if (username == null || username.isBlank()) username = userInfo;
                    }
                }

                String host = hostPort;
                int port = 3306;
                int portColonIndex = hostPort.lastIndexOf(':');
                if (portColonIndex != -1) {
                    host = hostPort.substring(0, portColonIndex);
                    try {
                        port = Integer.parseInt(hostPort.substring(portColonIndex + 1));
                    } catch (NumberFormatException e) {
                        // Keep 3306
                    }
                }

                String databaseName = "";
                if (slashIndex != -1) {
                    int endOfDb = questionIndex != -1 ? questionIndex : withoutScheme.length();
                    if (endOfDb > slashIndex + 1) {
                        databaseName = withoutScheme.substring(slashIndex + 1, endOfDb);
                    }
                }

                String query = "";
                if (questionIndex != -1) {
                    query = withoutScheme.substring(questionIndex + 1);
                }

                String jdbcUrl = "jdbc:mysql://" + host + ":" + port + "/" + databaseName;
                if (!query.isEmpty()) {
                    jdbcUrl += "?" + query;
                } else {
                    jdbcUrl += "?useSSL=true&requireSSL=true&verifyServerCertificate=false&serverTimezone=UTC&allowPublicKeyRetrieval=true&connectTimeout=10000&socketTimeout=30000";
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
                dataSource.setInitializationFailTimeout(60000);
                
                return dataSource;
            } catch (Exception e) {
                log.error("Failed to parse database URL manually: {}", rawUrl, e);
                throw new IllegalArgumentException("Invalid database URL format", e);
            }
        } else {
            log.info("Database URL is in standard format ({}). Delegating to Spring builder.", rawUrl);
            return properties.initializeDataSourceBuilder().type(HikariDataSource.class).build();
        }
    }
}
