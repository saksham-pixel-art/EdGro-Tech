package com.edgro.controller;

import com.edgro.dto.ApiResponse;
import com.edgro.dto.UniversityDto;
import com.edgro.service.UniversityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/universities")
public class UniversityController {

    private final UniversityService universityService;

    public UniversityController(UniversityService universityService) {
        this.universityService = universityService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UniversityDto>>> list(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String naac) {
        List<UniversityDto> data = (search != null || naac != null)
                ? universityService.search(search, naac)
                : universityService.findAll();
        return ResponseEntity.ok(ApiResponse.ok(data));
    }

    @GetMapping("/filters")
    public ResponseEntity<ApiResponse<UniversityService.UniversityFilters>> filters() {
        return ResponseEntity.ok(ApiResponse.ok(universityService.getFilters()));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<UniversityDto>> get(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(universityService.findBySlug(slug)));
    }

    @PostMapping("/upload-image")
    public ResponseEntity<ApiResponse<UniversityDto>> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "universityName", required = false) String universityName,
            @RequestParam(value = "slug", required = false) String slug,
            @RequestParam(value = "imageType", defaultValue = "primary") String imageType) {
        
        String identifier = slug != null && !slug.isBlank() ? slug : universityName;
        if (identifier == null || identifier.isBlank()) {
            throw new IllegalArgumentException("Either slug or universityName must be provided");
        }
        
        return ResponseEntity.ok(ApiResponse.ok(universityService.uploadImage(file, identifier, imageType)));
    }
    
    @PatchMapping("/{id}/image")
    public ResponseEntity<ApiResponse<UniversityDto>> updateImageDetails(
            @PathVariable Long id,
            @RequestBody UniversityDto imageDetails) {
        // Optional logic for direct string path updates without file upload
        // Leaving it simple for now, can be implemented similarly
        return ResponseEntity.ok(ApiResponse.ok(null));
    }
}
