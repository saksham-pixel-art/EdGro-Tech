package com.edgro.dto;

import com.edgro.model.Program;
import java.math.BigDecimal;
import java.util.List;

public class ProgramDto {
    private Long id;
    private String slug;
    private String name;
    private String category;
    private String tag;
    private String description;
    private BigDecimal feesMin;
    private BigDecimal feesMax;
    private String feesRange;
    private String duration;
    private int universityCount;
    private String eligibility;
    private List<String> outcomes;
    private List<String> specializations;

    public static ProgramDto from(Program p) {
        ProgramDto dto = new ProgramDto();
        dto.id = p.getId();
        dto.slug = p.getSlug();
        dto.name = p.getName();
        dto.category = p.getCategory().name();
        dto.tag = p.getTag();
        dto.description = p.getDescription();
        dto.feesMin = p.getFeesMin();
        dto.feesMax = p.getFeesMax();
        dto.duration = p.getDuration();
        dto.universityCount = p.getUniversityCount();
        dto.eligibility = p.getEligibility();
        dto.outcomes = p.getOutcomes().stream().map(o -> o.getOutcome()).toList();
        dto.specializations = p.getSpecializations().stream().map(s -> s.getSpecialization()).toList();

        if (p.getFeesMin() != null && p.getFeesMax() != null) {
            dto.feesRange = "₹" + formatAmount(p.getFeesMin()) + " – ₹" + formatAmount(p.getFeesMax());
        }
        return dto;
    }

    private static String formatAmount(BigDecimal amount) {
        long val = amount.longValue();
        if (val >= 100000) return String.format("%.1fL", val / 100000.0);
        if (val >= 1000)   return String.format("%.0fK", val / 1000.0);
        return String.valueOf(val);
    }

    public Long getId() { return id; }
    public String getSlug() { return slug; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public String getTag() { return tag; }
    public String getDescription() { return description; }
    public BigDecimal getFeesMin() { return feesMin; }
    public BigDecimal getFeesMax() { return feesMax; }
    public String getFeesRange() { return feesRange; }
    public String getDuration() { return duration; }
    public int getUniversityCount() { return universityCount; }
    public String getEligibility() { return eligibility; }
    public List<String> getOutcomes() { return outcomes; }
    public List<String> getSpecializations() { return specializations; }
}
