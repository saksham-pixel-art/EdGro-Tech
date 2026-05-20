package com.edgro.service;

import com.edgro.dto.CourseDto;
import com.edgro.dto.SpecializationDto;
import com.edgro.model.Course;
import com.edgro.repository.CourseRepository;
import com.edgro.repository.SpecializationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final SpecializationRepository specializationRepository;

    public CourseService(CourseRepository courseRepository, SpecializationRepository specializationRepository) {
        this.courseRepository = courseRepository;
        this.specializationRepository = specializationRepository;
    }

    @Transactional(readOnly = true)
    public List<CourseDto> getCoursesByUniversity(Long universityId) {
        return courseRepository.findByUniversityIdAndActiveTrue(universityId)
                .stream()
                .map(CourseDto::from)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<SpecializationDto> getSpecializationsByCourse(Long courseId) {
        return specializationRepository.findByCourseIdAndActiveTrue(courseId)
                .stream()
                .map(SpecializationDto::from)
                .collect(Collectors.toList());
    }
}
