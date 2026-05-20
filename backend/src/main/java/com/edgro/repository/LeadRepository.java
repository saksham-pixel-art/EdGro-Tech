package com.edgro.repository;

import com.edgro.model.Lead;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {

    Page<Lead> findAllByOrderByCreatedAtDesc(Pageable pageable);

    List<Lead> findByStatus(Lead.LeadStatus status);

    boolean existsByPhoneAndCreatedAtAfter(String phone, LocalDateTime after);

    @Query("""
        SELECT l FROM Lead l
        WHERE (:status IS NULL OR l.status = :status)
          AND (:search IS NULL OR LOWER(l.name) LIKE LOWER(CONCAT('%', :search, '%'))
               OR l.phone LIKE CONCAT('%', :search, '%'))
        ORDER BY l.createdAt DESC
        """)
    Page<Lead> search(@Param("search") String search,
                      @Param("status") Lead.LeadStatus status,
                      Pageable pageable);

    @Query("SELECT COUNT(l) FROM Lead l WHERE l.createdAt >= :since")
    long countSince(@Param("since") LocalDateTime since);

    List<Lead> findBySyncStatusIn(List<Lead.SyncStatus> statuses);

    long countBySyncStatus(Lead.SyncStatus syncStatus);
}
