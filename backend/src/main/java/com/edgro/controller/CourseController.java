package com.edgro.controller;

import com.edgro.dto.ApiResponse;
import com.edgro.dto.CourseDto;
import com.edgro.dto.SpecializationDto;
import com.edgro.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/universities/{id}/courses")
    public ResponseEntity<ApiResponse<List<CourseDto>>> getUniversityCourses(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(courseService.getCoursesByUniversity(id)));
    }

    @GetMapping("/courses/{id}/specializations")
    public ResponseEntity<ApiResponse<List<SpecializationDto>>> getCourseSpecializations(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(courseService.getSpecializationsByCourse(id)));
    }
}
