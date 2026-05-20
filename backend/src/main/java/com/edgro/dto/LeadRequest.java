package com.edgro.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class LeadRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[+\\d][\\d\\s\\-]{7,19}$", message = "Enter a valid phone number")
    private String phone;

    @NotBlank(message = "Email address is required")
    @Email(message = "Enter a valid email address")
    @Size(max = 200, message = "Email too long")
    private String email;

    @Size(max = 100, message = "City name too long")
    private String city;

    @Size(max = 100, message = "State name too long")
    private String state;

    @Size(max = 200, message = "University name too long")
    private String preferredUniversity;

    @Size(max = 200, message = "Course interest too long")
    private String courseInterest;

    @Size(max = 100)
    private String source;

    @Size(max = 100)
    private String utmSource;

    @Size(max = 100)
    private String utmMedium;

    @Size(max = 100)
    private String utmCampaign;

    // ── Getters & Setters ─────────────────────────────────────
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getPreferredUniversity() { return preferredUniversity; }
    public void setPreferredUniversity(String preferredUniversity) { this.preferredUniversity = preferredUniversity; }
    public String getCourseInterest() { return courseInterest; }
    public void setCourseInterest(String courseInterest) { this.courseInterest = courseInterest; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public String getUtmSource() { return utmSource; }
    public void setUtmSource(String utmSource) { this.utmSource = utmSource; }
    public String getUtmMedium() { return utmMedium; }
    public void setUtmMedium(String utmMedium) { this.utmMedium = utmMedium; }
    public String getUtmCampaign() { return utmCampaign; }
    public void setUtmCampaign(String utmCampaign) { this.utmCampaign = utmCampaign; }
}
