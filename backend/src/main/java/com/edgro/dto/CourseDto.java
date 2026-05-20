package com.edgro.dto;

import com.edgro.model.Course;
import java.math.BigDecimal;

public class CourseDto {
    private Long id;
    private Long universityId;
    private String courseName;
    private String degreeType;
    private String duration;
    private String eligibility;
    private BigDecimal totalFees;
    private String studyMode;
    private boolean placementSupport;

    public static CourseDto from(Course c) {
        CourseDto dto = new CourseDto();
        dto.id = c.getId();
        dto.universityId = c.getUniversity().getId();
        dto.courseName = c.getCourseName();
        dto.degreeType = c.getDegreeType();
        dto.duration = c.getDuration();
        dto.eligibility = c.getEligibility();
        dto.totalFees = c.getTotalFees();
        dto.studyMode = c.getStudyMode();
        dto.placementSupport = c.isPlacementSupport();
        return dto;
    }

    public Long getId() { return id; }
    public Long getUniversityId() { return universityId; }
    public String getCourseName() { return courseName; }
    public String getDegreeType() { return degreeType; }
    public String getDuration() { return duration; }
    public String getEligibility() { return eligibility; }
    public BigDecimal getTotalFees() { return totalFees; }
    public String getStudyMode() { return studyMode; }
    public boolean isPlacementSupport() { return placementSupport; }
}
