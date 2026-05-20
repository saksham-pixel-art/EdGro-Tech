package com.edgro.repository;

import com.edgro.model.UniversityStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UniversityStatsRepository extends JpaRepository<UniversityStats, Long> {
}
