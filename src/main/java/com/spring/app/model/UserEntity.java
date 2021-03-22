package com.spring.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "user_name")
        }
)

public class UserEntity extends BaseEntity {
    @Column(name = "user_name", unique = true, nullable = false)
    private String userName;

    @Column(name = "password", nullable = false)
    @JsonIgnore
    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private RoleEntity role;
}
