package com.marcos.contacts.daoRepository;

import com.marcos.contacts.models.Contact;

import org.springframework.data.jpa.repository.JpaRepository;


public interface RepositoryContact extends JpaRepository<Contact, Long > {



    
}