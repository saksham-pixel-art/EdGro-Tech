package com.edgro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class EdgroApplication {
    public static void main(String[] args) {
        SpringApplication.run(EdgroApplication.class, args);
    }
}
