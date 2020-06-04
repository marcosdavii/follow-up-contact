package com.marcos.contacts.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Client")
public class Contact {
    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "sexo")
    private String sexo;

    @Column(name = "phone")
    private String phone;
    
    @Column(name = "email")
    private String email;

    public Contact() {

    }

    public Contact(String name, String sexo, String phone, String email) {
        this.name = name;
        this.sexo = sexo;
        this.phone = phone;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "CONTATO [email=" + email + ", id=" + id + ", name=" + name + ", phone=" + phone + ", sexo=" + sexo
                + "]";
    }

    
    
}