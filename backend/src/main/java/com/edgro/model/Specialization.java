package com.edgro.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "specializations")
public class Specialization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "specialization_name", nullable = false, length = 200)
    private String specializationName;

    @Column(name = "specialization_slug", nullable = false, length = 200)
    private String specializationSlug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "average_salary", length = 100)
    private String averageSalary;

    @Column(name = "career_opportunities", columnDefinition = "TEXT")
    private String careerOpportunities;

    @Column(name = "skills_covered", columnDefinition = "TEXT")
    private String skillsCovered;

    @Column(nullable = false)
    private boolean active = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    public String getSpecializationName() { return specializationName; }
    public void setSpecializationName(String specializationName) { this.specializationName = specializationName; }
    public String getSpecializationSlug() { return specializationSlug; }
    public void setSpecializationSlug(String specializationSlug) { this.specializationSlug = specializationSlug; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getAverageSalary() { return averageSalary; }
    public void setAverageSalary(String averageSalary) { this.averageSalary = averageSalary; }
    public String getCareerOpportunities() { return careerOpportunities; }
    public void setCareerOpportunities(String careerOpportunities) { this.careerOpportunities = careerOpportunities; }
    public String getSkillsCovered() { return skillsCovered; }
    public void setSkillsCovered(String skillsCovered) { this.skillsCovered = skillsCovered; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
