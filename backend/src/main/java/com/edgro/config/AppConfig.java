package com.edgro.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.Executor;

/**
 * Application-level Spring beans.
 * - RestTemplate for outbound HTTP calls (Google Sheets API, token endpoint)
 * - Async executor for non-blocking Google Sheets sync
 * - Scheduling enabled for the SyncRetryScheduler
 */
@Configuration
@EnableAsync
@EnableScheduling
public class AppConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    /**
     * Dedicated thread pool for async Google Sheets sync operations.
     * Keeps them isolated from the main Tomcat request threads.
     */
    @Bean(name = "sheetsAsyncExecutor")
    public Executor sheetsAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setMaxPoolSize(5);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("sheets-sync-");
        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.setAwaitTerminationSeconds(30);
        executor.initialize();
        return executor;
    }
}
