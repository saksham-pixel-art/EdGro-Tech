package com.edgro.model;

import jakarta.persistence.*;

@Entity
@Table(name = "university_highlights")
public class UniversityHighlight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "university_id", nullable = false)
    private University university;

    @Column(nullable = false, length = 200)
    private String highlight;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public University getUniversity() { return university; }
    public void setUniversity(University university) { this.university = university; }
    public String getHighlight() { return highlight; }
    public void setHighlight(String highlight) { this.highlight = highlight; }
    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
}
