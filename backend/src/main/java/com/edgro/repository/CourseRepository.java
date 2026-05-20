package com.edgro.repository;

import com.edgro.model.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByUniversityIdAndActiveTrue(Long universityId);

    Page<Course> findByActiveTrue(Pageable pageable);

    Page<Course> findByCourseNameContainingIgnoreCaseAndActiveTrue(String search, Pageable pageable);
}
