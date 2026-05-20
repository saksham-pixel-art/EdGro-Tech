package com.edgro.dto;

import com.edgro.model.Specialization;

public class SpecializationDto {
    private Long id;
    private Long courseId;
    private String specializationName;
    private String specializationSlug;
    private String description;
    private String averageSalary;
    private String careerOpportunities;
    private String skillsCovered;

    public static SpecializationDto from(Specialization s) {
        SpecializationDto dto = new SpecializationDto();
        dto.id = s.getId();
        dto.courseId = s.getCourse().getId();
        dto.specializationName = s.getSpecializationName();
        dto.specializationSlug = s.getSpecializationSlug();
        dto.description = s.getDescription();
        dto.averageSalary = s.getAverageSalary();
        dto.careerOpportunities = s.getCareerOpportunities();
        dto.skillsCovered = s.getSkillsCovered();
        return dto;
    }

    public Long getId() { return id; }
    public Long getCourseId() { return courseId; }
    public String getSpecializationName() { return specializationName; }
    public String getSpecializationSlug() { return specializationSlug; }
    public String getDescription() { return description; }
    public String getAverageSalary() { return averageSalary; }
    public String getCareerOpportunities() { return careerOpportunities; }
    public String getSkillsCovered() { return skillsCovered; }
}
