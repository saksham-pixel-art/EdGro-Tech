package com.edgro.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "university_id", nullable = false)
    private University university;

    @Column(name = "course_name", nullable = false, length = 200)
    private String courseName;

    @Column(name = "degree_type", nullable = false, length = 100)
    private String degreeType;

    @Column(length = 50)
    private String duration;

    @Column(columnDefinition = "TEXT")
    private String eligibility;

    @Column(name = "total_fees", precision = 12, scale = 2)
    private BigDecimal totalFees;

    @Column(name = "study_mode", length = 100)
    private String studyMode;

    @Column(name = "placement_support", nullable = false)
    private boolean placementSupport = true;

    @Column(nullable = false)
    private boolean active = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Specialization> specializations = new ArrayList<>();

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
    public University getUniversity() { return university; }
    public void setUniversity(University university) { this.university = university; }
    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }
    public String getDegreeType() { return degreeType; }
    public void setDegreeType(String degreeType) { this.degreeType = degreeType; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    public String getEligibility() { return eligibility; }
    public void setEligibility(String eligibility) { this.eligibility = eligibility; }
    public BigDecimal getTotalFees() { return totalFees; }
    public void setTotalFees(BigDecimal totalFees) { this.totalFees = totalFees; }
    public String getStudyMode() { return studyMode; }
    public void setStudyMode(String studyMode) { this.studyMode = studyMode; }
    public boolean isPlacementSupport() { return placementSupport; }
    public void setPlacementSupport(boolean placementSupport) { this.placementSupport = placementSupport; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public List<Specialization> getSpecializations() { return specializations; }
    public void setSpecializations(List<Specialization> specializations) { this.specializations = specializations; }
}
