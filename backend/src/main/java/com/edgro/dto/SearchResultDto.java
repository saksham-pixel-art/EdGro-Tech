package com.edgro.dto;

import java.util.List;

public class SearchResultDto {
    private List<UniversityDto> universities;
    private List<CourseDto> courses;

    public SearchResultDto() {}

    public SearchResultDto(List<UniversityDto> universities, List<CourseDto> courses) {
        this.universities = universities;
        this.courses = courses;
    }

    public List<UniversityDto> getUniversities() { return universities; }
    public void setUniversities(List<UniversityDto> universities) { this.universities = universities; }
    public List<CourseDto> getCourses() { return courses; }
    public void setCourses(List<CourseDto> courses) { this.courses = courses; }
}
