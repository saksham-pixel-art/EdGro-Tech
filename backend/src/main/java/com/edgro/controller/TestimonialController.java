package com.edgro.controller;

import com.edgro.dto.ApiResponse;
import com.edgro.dto.TestimonialDto;
import com.edgro.service.TestimonialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/testimonials")
public class TestimonialController {

    private final TestimonialService testimonialService;

    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TestimonialDto>>> list() {
        return ResponseEntity.ok(ApiResponse.ok(testimonialService.findAll()));
    }
}
