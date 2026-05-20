package com.edgro.service;

import com.edgro.dto.ContactRequest;
import com.edgro.exception.ResourceNotFoundException;
import com.edgro.model.ContactMessage;
import com.edgro.repository.ContactMessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);
    private final ContactMessageRepository contactMessageRepository;

    public ContactService(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    @Transactional
    public ContactMessage submit(ContactRequest req, String ipAddress) {
        ContactMessage msg = new ContactMessage();
        msg.setName(req.getName().trim());
        msg.setEmail(req.getEmail().trim().toLowerCase());
        msg.setPhone(req.getPhone() != null ? req.getPhone().trim() : null);
        msg.setSubject(req.getSubject());
        msg.setMessage(req.getMessage().trim());
        msg.setIpAddress(ipAddress);

        ContactMessage saved = contactMessageRepository.save(msg);
        log.info("New contact message: id={}, email={}", saved.getId(), saved.getEmail());
        return saved;
    }

    @Transactional(readOnly = true)
    public Page<ContactMessage> findAll(Pageable pageable) {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    @Transactional(readOnly = true)
    public Page<ContactMessage> findUnread(Pageable pageable) {
        return contactMessageRepository.findByReadAtIsNullOrderByCreatedAtDesc(pageable);
    }

    @Transactional
    public ContactMessage markRead(Long id) {
        ContactMessage msg = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found: " + id));
        if (msg.getReadAt() == null) {
            msg.setReadAt(LocalDateTime.now());
            return contactMessageRepository.save(msg);
        }
        return msg;
    }

    public long countUnread() {
        return contactMessageRepository.countByReadAtIsNull();
    }
}
