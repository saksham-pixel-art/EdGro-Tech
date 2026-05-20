package com.edgro.service;

import com.edgro.dto.CourseDto;
import com.edgro.dto.SearchResultDto;
import com.edgro.dto.UniversityDto;
import com.edgro.repository.CourseRepository;
import com.edgro.repository.UniversityRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {

    private final UniversityRepository universityRepository;
    private final CourseRepository courseRepository;

    public SearchService(UniversityRepository universityRepository, CourseRepository courseRepository) {
        this.universityRepository = universityRepository;
        this.courseRepository = courseRepository;
    }

    @Transactional(readOnly = true)
    public SearchResultDto search(String query) {
        List<UniversityDto> universities = universityRepository.search(query, null)
                .stream()
                .limit(10)
                .map(UniversityDto::from)
                .collect(Collectors.toList());

        List<CourseDto> courses = courseRepository.findByCourseNameContainingIgnoreCaseAndActiveTrue(query, PageRequest.of(0, 20))
                .stream()
                .map(CourseDto::from)
                .collect(Collectors.toList());

        return new SearchResultDto(universities, courses);
    }
}
