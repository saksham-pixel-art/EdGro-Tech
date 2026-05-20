package com.edgro.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Serves uploaded university images from the project-root /public folder.
 * URL pattern: /universities/**  → <project-root>/public/universities/**
 * e.g. GET /universities/amity/primary.png → public/universities/amity/primary.png
 */
@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Resolve project root (one level up from /backend when running via Maven)
        String rootDir = System.getProperty("user.dir");
        Path projectRoot = Paths.get(rootDir);
        if (projectRoot.endsWith("backend")) {
            projectRoot = projectRoot.getParent();
        }

        String publicPath = projectRoot.resolve("public").toAbsolutePath().toUri().toString();

        registry
            .addResourceHandler("/universities/**")
            .addResourceLocations(publicPath + "/universities/")
            .setCachePeriod(86400); // 1 day cache
    }
}
