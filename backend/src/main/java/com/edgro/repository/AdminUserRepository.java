package com.edgro.repository;

import com.edgro.model.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {

    Optional<AdminUser> findByEmailAndActiveTrue(String email);

    boolean existsByEmail(String email);
}
