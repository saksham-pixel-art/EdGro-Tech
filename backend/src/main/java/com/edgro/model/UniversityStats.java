package com.edgro.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "university_stats")
public class UniversityStats {

    @Id
    @Column(name = "university_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "university_id")
    private University university;

    @Column(name = "placement_percentage", precision = 5, scale = 2)
    private BigDecimal placementPercentage;

    @Column(name = "avg_package", length = 50)
    private String avgPackage;

    @Column(name = "highest_package", length = 50)
    private String highestPackage;

    @Column(columnDefinition = "TEXT")
    private String recruiters;

    @Column(columnDefinition = "TEXT")
    private String approvals;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public University getUniversity() { return university; }
    public void setUniversity(University university) { this.university = university; }
    public BigDecimal getPlacementPercentage() { return placementPercentage; }
    public void setPlacementPercentage(BigDecimal placementPercentage) { this.placementPercentage = placementPercentage; }
    public String getAvgPackage() { return avgPackage; }
    public void setAvgPackage(String avgPackage) { this.avgPackage = avgPackage; }
    public String getHighestPackage() { return highestPackage; }
    public void setHighestPackage(String highestPackage) { this.highestPackage = highestPackage; }
    public String getRecruiters() { return recruiters; }
    public void setRecruiters(String recruiters) { this.recruiters = recruiters; }
    public String getApprovals() { return approvals; }
    public void setApprovals(String approvals) { this.approvals = approvals; }
}
