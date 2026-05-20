package com.edgro.service;

import com.edgro.dto.TestimonialDto;
import com.edgro.repository.TestimonialRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;

    public TestimonialService(TestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }

    @Cacheable("testimonials")
    public List<TestimonialDto> findAll() {
        return testimonialRepository.findByActiveTrueOrderBySortOrderAsc()
                .stream().map(TestimonialDto::from).toList();
    }
}
