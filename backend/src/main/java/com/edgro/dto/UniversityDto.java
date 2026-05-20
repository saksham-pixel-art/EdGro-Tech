package com.edgro.dto;

import com.edgro.model.University;
import java.math.BigDecimal;
import java.util.List;

public class UniversityDto {
    private Long id;
    private String slug;
    private String name;
    private String shortName;
    private String city;
    private String naacGrade;
    private int hue;
    private String primaryImage;
    private String heroImage;
    private String thumbnailImage;
    private Integer established;
    private int programs;
    private BigDecimal feesMin;
    private BigDecimal feesMax;
    private String feesRange;
    private String placement;
    private String alumni;
    private String tag;
    private List<String> highlights;
    private String logo;
    private String description;
    private String accreditation;
    private String ranking;
    private String location;
    private String websiteUrl;

    public static UniversityDto from(University u) {
        UniversityDto dto = new UniversityDto();
        dto.id = u.getId();
        dto.slug = u.getSlug();
        dto.name = u.getName();
        dto.shortName = u.getShortName();
        dto.city = u.getCity();
        dto.naacGrade = u.getNaacGrade();
        dto.hue = u.getHue();
        dto.primaryImage = u.getPrimaryImage();
        dto.heroImage = u.getHeroImage();
        dto.thumbnailImage = u.getThumbnailImage();
        dto.established = u.getEstablished();
        dto.programs = u.getPrograms();
        dto.feesMin = u.getFeesMin();
        dto.feesMax = u.getFeesMax();
        dto.placement = u.getPlacement();
        dto.alumni = u.getAlumni();
        dto.tag = u.getTag() != null ? u.getTag().name() : null;
        if ("BestROI".equals(dto.tag)) {
            dto.tag = "Best ROI";
        }
        dto.highlights = u.getHighlights().stream()
                .map(h -> h.getHighlight())
                .toList();
        dto.logo = u.getLogo();
        dto.description = u.getDescription();
        dto.accreditation = u.getAccreditation();
        dto.ranking = u.getRanking();
        dto.location = u.getLocation();
        dto.websiteUrl = u.getWebsiteUrl();

        if (u.getFeesMin() != null && u.getFeesMax() != null) {
            dto.feesRange = "₹" + formatAmount(u.getFeesMin()) + " – ₹" + formatAmount(u.getFeesMax());
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
    public String getShortName() { return shortName; }
    public String getCity() { return city; }
    public String getNaacGrade() { return naacGrade; }
    public int getHue() { return hue; }
    public String getPrimaryImage() { return primaryImage; }
    public String getHeroImage() { return heroImage; }
    public String getThumbnailImage() { return thumbnailImage; }
    public Integer getEstablished() { return established; }
    public int getPrograms() { return programs; }
    public BigDecimal getFeesMin() { return feesMin; }
    public BigDecimal getFeesMax() { return feesMax; }
    public String getFeesRange() { return feesRange; }
    public String getPlacement() { return placement; }
    public String getAlumni() { return alumni; }
    public String getTag() { return tag; }
    public List<String> getHighlights() { return highlights; }
    public String getLogo() { return logo; }
    public String getDescription() { return description; }
    public String getAccreditation() { return accreditation; }
    public String getRanking() { return ranking; }
    public String getLocation() { return location; }
    public String getWebsiteUrl() { return websiteUrl; }
}
