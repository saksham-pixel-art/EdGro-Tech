package com.edgro.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "programs")
public class Program {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String slug;

    @Column(nullable = false, length = 200)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProgramCategory category;

    @Column(length = 50)
    private String tag;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "fees_min", precision = 12, scale = 2)
    private BigDecimal feesMin;

    @Column(name = "fees_max", precision = 12, scale = 2)
    private BigDecimal feesMax;

    @Column(length = 50)
    private String duration;

    @Column(name = "university_count", nullable = false)
    private int universityCount;

    @Column(length = 300)
    private String eligibility;

    @Column(nullable = false)
    private boolean active = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "program", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("sortOrder ASC")
    private List<ProgramOutcome> outcomes = new ArrayList<>();

    @OneToMany(mappedBy = "program", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("sortOrder ASC")
    private List<ProgramSpecialization> specializations = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum ProgramCategory { Undergraduate, Postgraduate, Certification }

    // ── Getters & Setters ─────────────────────────────────────
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public ProgramCategory getCategory() { return category; }
    public void setCategory(ProgramCategory category) { this.category = category; }
    public String getTag() { return tag; }
    public void setTag(String tag) { this.tag = tag; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public BigDecimal getFeesMin() { return feesMin; }
    public void setFeesMin(BigDecimal feesMin) { this.feesMin = feesMin; }
    public BigDecimal getFeesMax() { return feesMax; }
    public void setFeesMax(BigDecimal feesMax) { this.feesMax = feesMax; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    public int getUniversityCount() { return universityCount; }
    public void setUniversityCount(int universityCount) { this.universityCount = universityCount; }
    public String getEligibility() { return eligibility; }
    public void setEligibility(String eligibility) { this.eligibility = eligibility; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public List<ProgramOutcome> getOutcomes() { return outcomes; }
    public void setOutcomes(List<ProgramOutcome> outcomes) { this.outcomes = outcomes; }
    public List<ProgramSpecialization> getSpecializations() { return specializations; }
    public void setSpecializations(List<ProgramSpecialization> specializations) { this.specializations = specializations; }
}
