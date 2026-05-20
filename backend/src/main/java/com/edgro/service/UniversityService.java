package com.edgro.service;

import com.edgro.dto.UniversityDto;
import com.edgro.exception.ResourceNotFoundException;
import com.edgro.model.University;
import com.edgro.repository.UniversityRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;

@Service
@Transactional(readOnly = true)
public class UniversityService {

    private final UniversityRepository universityRepository;

    public UniversityService(UniversityRepository universityRepository) {
        this.universityRepository = universityRepository;
    }

    @Cacheable("universities")
    public List<UniversityDto> findAll() {
        return universityRepository.findByActiveTrueOrderByNameAsc()
                .stream().map(UniversityDto::from).toList();
    }

    public UniversityDto findBySlug(String slug) {
        return universityRepository.findBySlugAndActiveTrue(slug)
                .map(UniversityDto::from)
                .orElseThrow(() -> new ResourceNotFoundException("University not found: " + slug));
    }

    public List<UniversityDto> search(String query, String naac) {
        return universityRepository.search(
                        query != null && !query.isBlank() ? query.trim() : null,
                        naac != null && !naac.isBlank() ? naac.trim() : null)
                .stream().map(UniversityDto::from).toList();
    }

    @Cacheable("university-filters")
    public UniversityFilters getFilters() {
        return new UniversityFilters(
                universityRepository.findDistinctCities(),
                universityRepository.findDistinctNaacGrades());
    }

    public record UniversityFilters(List<String> cities, List<String> naacGrades) {}

    @Transactional
    public UniversityDto uploadImage(MultipartFile file, String nameOrSlug, String imageType) {
        University u = universityRepository.findBySlugAndActiveTrue(nameOrSlug)
                .orElseGet(() -> universityRepository.findByActiveTrueOrderByNameAsc()
                        .stream().filter(univ -> univ.getName().equalsIgnoreCase(nameOrSlug)).findFirst()
                        .orElseThrow(() -> new ResourceNotFoundException("University not found: " + nameOrSlug)));

        try {
            String rootDir = System.getProperty("user.dir");
            Path projectRoot = Paths.get(rootDir);
            if (projectRoot.endsWith("backend")) {
                projectRoot = projectRoot.getParent();
            }
            Path uploadPath = projectRoot.resolve("public/universities").resolve(u.getSlug());

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".")
                    ? originalFilename.substring(originalFilename.lastIndexOf(".")) : ".webp";

            if (imageType == null || imageType.isBlank()) imageType = "primary";
            String filename = imageType.toLowerCase() + extension;

            Path filePath = uploadPath.resolve(filename);
            file.transferTo(filePath.toFile());

            String relativePath = "/universities/" + u.getSlug() + "/" + filename;

            if ("primary".equalsIgnoreCase(imageType)) {
                u.setPrimaryImage(relativePath);
                if (u.getHeroImage() == null || u.getHeroImage().isEmpty()) u.setHeroImage(relativePath);
                if (u.getThumbnailImage() == null || u.getThumbnailImage().isEmpty()) u.setThumbnailImage(relativePath);
            } else if ("hero".equalsIgnoreCase(imageType)) {
                u.setHeroImage(relativePath);
            } else if ("thumbnail".equalsIgnoreCase(imageType)) {
                u.setThumbnailImage(relativePath);
            } else if ("logo".equalsIgnoreCase(imageType)) {
                u.setLogo(relativePath);
            }

            u = universityRepository.save(u);
            return UniversityDto.from(u);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }
}
