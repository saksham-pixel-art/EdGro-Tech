package com.edgro.repository;

import com.edgro.model.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UniversityRepository extends JpaRepository<University, Long> {

    List<University> findByActiveTrueOrderByNameAsc();

    Optional<University> findBySlugAndActiveTrue(String slug);

    List<University> findByNaacGradeAndActiveTrue(String naacGrade);

    List<University> findByCityAndActiveTrue(String city);

    @Query("""
        SELECT u FROM University u
        WHERE u.active = true
          AND (:search IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :search, '%'))
               OR LOWER(u.city) LIKE LOWER(CONCAT('%', :search, '%')))
          AND (:naac IS NULL OR u.naacGrade = :naac)
        ORDER BY u.name ASC
        """)
    List<University> search(@Param("search") String search, @Param("naac") String naac);

    @Query("SELECT DISTINCT u.city FROM University u WHERE u.active = true ORDER BY u.city ASC")
    List<String> findDistinctCities();

    @Query("SELECT DISTINCT u.naacGrade FROM University u WHERE u.active = true ORDER BY u.naacGrade DESC")
    List<String> findDistinctNaacGrades();
}
