package com.freeloom.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow all endpoints
                .allowedOrigins("http://localhost:5173") // Allow requests from your frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow the HTTP methods you need
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow credentials (cookies, etc.)
    }
}
