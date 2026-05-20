package com.edgro.service;

import com.edgro.dto.ProgramDto;
import com.edgro.exception.ResourceNotFoundException;
import com.edgro.model.Program;
import com.edgro.repository.ProgramRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ProgramService {

    private final ProgramRepository programRepository;

    public ProgramService(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

    @Cacheable("programs")
    public List<ProgramDto> findAll() {
        return programRepository.findByActiveTrueOrderByNameAsc()
                .stream().map(ProgramDto::from).toList();
    }

    public ProgramDto findBySlug(String slug) {
        return programRepository.findBySlugAndActiveTrue(slug)
                .map(ProgramDto::from)
                .orElseThrow(() -> new ResourceNotFoundException("Program not found: " + slug));
    }

    public List<ProgramDto> search(String query, String category) {
        Program.ProgramCategory cat = null;
        if (category != null && !category.isBlank()) {
            try { cat = Program.ProgramCategory.valueOf(category); }
            catch (IllegalArgumentException ignored) {}
        }
        return programRepository.search(
                        query != null && !query.isBlank() ? query.trim() : null, cat)
                .stream().map(ProgramDto::from).toList();
    }
}
