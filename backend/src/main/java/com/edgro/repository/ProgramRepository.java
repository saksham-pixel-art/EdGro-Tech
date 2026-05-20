package com.edgro.repository;

import com.edgro.model.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Long> {

    List<Program> findByActiveTrueOrderByNameAsc();

    Optional<Program> findBySlugAndActiveTrue(String slug);

    List<Program> findByCategoryAndActiveTrue(Program.ProgramCategory category);

    @Query("""
        SELECT p FROM Program p
        WHERE p.active = true
          AND (:search IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')))
          AND (:category IS NULL OR p.category = :category)
        ORDER BY p.name ASC
        """)
    List<Program> search(@Param("search") String search,
                         @Param("category") Program.ProgramCategory category);
}
