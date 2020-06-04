package com.marcos.contacts.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import com.marcos.contacts.daoRepository.RepositoryContact;
import com.marcos.contacts.exception.ResourceNotFoundException;

import com.marcos.contacts.models.Contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ContactController {
 

    @Autowired
    private RepositoryContact  repositoryContact;

    
    @GetMapping("/contact")
    public List<Contact> getAllContacts() {
        return repositoryContact.findAll();
    }

    @GetMapping("/contacts/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable(value = "id") final Long id)
            throws ResourceNotFoundException {
        final Contact contact = repositoryContact.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contato não achado" + "id"));
        return ResponseEntity.ok().body(contact);
    }

    @PostMapping("/contact")
    public Contact createContact(@Valid @RequestBody final Contact contact) {
        return repositoryContact.save(contact);
    }

    @PutMapping("/contacts/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable(value = "id") final Long id,
            @Valid @RequestBody final Contact contactDetails) throws ResourceNotFoundException {
        final Contact contact = repositoryContact.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found for this id :: " + id));

        contact.setName(contactDetails.getName());
        contact.setEmail(contactDetails.getEmail());
        contact.setPhone(contactDetails.getPhone());
        contact.setSexo(contactDetails.getSexo());
        final Contact updatedContact = repositoryContact.save(contact);
        return ResponseEntity.ok(updatedContact);
    }

    @DeleteMapping("/contacts/{id}")
    public Map<String, Boolean> deleteContact(@PathVariable(value = "id") final Long id)
            throws ResourceNotFoundException {
        final Contact contact = repositoryContact.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found for this id :: " + id));

        repositoryContact.delete(contact);
        final Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}