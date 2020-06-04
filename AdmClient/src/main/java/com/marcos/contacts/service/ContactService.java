package com.marcos.contacts.service;

import java.util.List;

import com.marcos.contacts.models.Contact;

public interface ContactService {

    List<Contact> findAll();

    Contact findById(Long id);

    void save(Contact contact);

    void deleteById(Long id);
    
    
}