package com.edgro.controller;

import com.edgro.dto.ApiResponse;
import com.edgro.dto.SearchResultDto;
import com.edgro.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<SearchResultDto>> search(@RequestParam String query) {
        return ResponseEntity.ok(ApiResponse.ok(searchService.search(query)));
    }
}
