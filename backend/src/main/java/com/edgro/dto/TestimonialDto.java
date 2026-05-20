package com.edgro.dto;

import com.edgro.model.Testimonial;

public class TestimonialDto {
    private Long id;
    private String name;
    private String role;
    private String university;
    private String program;
    private String content;
    private int rating;
    private String avatarUrl;

    public static TestimonialDto from(Testimonial t) {
        TestimonialDto dto = new TestimonialDto();
        dto.id = t.getId();
        dto.name = t.getName();
        dto.role = t.getRole();
        dto.university = t.getUniversity();
        dto.program = t.getProgram();
        dto.content = t.getContent();
        dto.rating = t.getRating();
        dto.avatarUrl = t.getAvatarUrl();
        return dto;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getRole() { return role; }
    public String getUniversity() { return university; }
    public String getProgram() { return program; }
    public String getContent() { return content; }
    public int getRating() { return rating; }
    public String getAvatarUrl() { return avatarUrl; }
}
