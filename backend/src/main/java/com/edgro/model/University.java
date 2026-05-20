package com.edgro.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "universities")
public class University {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String slug;

    @Column(name = "university_name", nullable = false, length = 200)
    private String name;

    @Column(name = "short_name", nullable = false, length = 20)
    private String shortName;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(name = "naac_grade", nullable = false, length = 10)
    private String naacGrade;

    @Column(nullable = false)
    private int hue;

    @Column(name = "primary_image", length = 500)
    private String primaryImage;

    @Column(name = "hero_image", length = 500)
    private String heroImage;

    @Column(name = "thumbnail_image", length = 500)
    private String thumbnailImage;

    private Integer established;

    @Column(nullable = false)
    private int programs;

    @Column(name = "fees_min", precision = 12, scale = 2)
    private BigDecimal feesMin;

    @Column(name = "fees_max", precision = 12, scale = 2)
    private BigDecimal feesMax;

    @Column(length = 50)
    private String placement;

    @Column(length = 50)
    private String alumni;

    @Enumerated(EnumType.STRING)
    private UniversityTag tag;

    @Column(nullable = false)
    private boolean active = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(length = 500)
    private String logo;


    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 200)
    private String accreditation;

    @Column(length = 100)
    private String ranking;

    @Column(length = 200)
    private String location;

    @Column(name = "website_url", length = 500)
    private String websiteUrl;

    @OneToMany(mappedBy = "university", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("sortOrder ASC")
    private List<UniversityHighlight> highlights = new ArrayList<>();

    @OneToOne(mappedBy = "university", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UniversityStats stats;

    @OneToMany(mappedBy = "university", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Course> courses = new ArrayList<>();

    @OneToMany(mappedBy = "university", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("sortOrder ASC")
    private List<Faq> faqs = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum UniversityTag { Recommended, Premium, Popular, BestROI }

    // ── Getters & Setters ─────────────────────────────────────
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getShortName() { return shortName; }
    public void setShortName(String shortName) { this.shortName = shortName; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getNaacGrade() { return naacGrade; }
    public void setNaacGrade(String naacGrade) { this.naacGrade = naacGrade; }
    public int getHue() { return hue; }
    public void setHue(int hue) { this.hue = hue; }
    public String getPrimaryImage() { return primaryImage; }
    public void setPrimaryImage(String primaryImage) { this.primaryImage = primaryImage; }
    public String getHeroImage() { return heroImage; }
    public void setHeroImage(String heroImage) { this.heroImage = heroImage; }
    public String getThumbnailImage() { return thumbnailImage; }
    public void setThumbnailImage(String thumbnailImage) { this.thumbnailImage = thumbnailImage; }
    public Integer getEstablished() { return established; }
    public void setEstablished(Integer established) { this.established = established; }
    public int getPrograms() { return programs; }
    public void setPrograms(int programs) { this.programs = programs; }
    public BigDecimal getFeesMin() { return feesMin; }
    public void setFeesMin(BigDecimal feesMin) { this.feesMin = feesMin; }
    public BigDecimal getFeesMax() { return feesMax; }
    public void setFeesMax(BigDecimal feesMax) { this.feesMax = feesMax; }
    public String getPlacement() { return placement; }
    public void setPlacement(String placement) { this.placement = placement; }
    public String getAlumni() { return alumni; }
    public void setAlumni(String alumni) { this.alumni = alumni; }
    public UniversityTag getTag() { return tag; }
    public void setTag(UniversityTag tag) { this.tag = tag; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public List<UniversityHighlight> getHighlights() { return highlights; }
    public void setHighlights(List<UniversityHighlight> highlights) { this.highlights = highlights; }
    public String getLogo() { return logo; }
    public void setLogo(String logo) { this.logo = logo; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getAccreditation() { return accreditation; }
    public void setAccreditation(String accreditation) { this.accreditation = accreditation; }
    public String getRanking() { return ranking; }
    public void setRanking(String ranking) { this.ranking = ranking; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getWebsiteUrl() { return websiteUrl; }
    public void setWebsiteUrl(String websiteUrl) { this.websiteUrl = websiteUrl; }
    public UniversityStats getStats() { return stats; }
    public void setStats(UniversityStats stats) { this.stats = stats; }
    public List<Course> getCourses() { return courses; }
    public void setCourses(List<Course> courses) { this.courses = courses; }
    public List<Faq> getFaqs() { return faqs; }
    public void setFaqs(List<Faq> faqs) { this.faqs = faqs; }
}
