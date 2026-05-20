package com.edgro.controller;

import com.edgro.dto.ApiResponse;
import com.edgro.dto.ProgramDto;
import com.edgro.service.ProgramService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/programs")
public class ProgramController {

    private final ProgramService programService;

    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProgramDto>>> list(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category) {
        List<ProgramDto> data = (search != null || category != null)
                ? programService.search(search, category)
                : programService.findAll();
        return ResponseEntity.ok(ApiResponse.ok(data));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<ProgramDto>> get(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(programService.findBySlug(slug)));
    }
}
