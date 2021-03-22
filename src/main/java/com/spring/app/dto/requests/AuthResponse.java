package com.spring.app.dto.requests;

import com.spring.app.model.RoleEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private Integer id;
    private String userName;
    private RoleEntity role;
    private String token;
    private String type;

}
