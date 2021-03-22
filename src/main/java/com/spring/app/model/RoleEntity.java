package com.spring.app.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "role",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name")
        })
public class RoleEntity extends BaseEntity {
    @Column(name = "name", unique = true, nullable = false)
    private String name;
}
