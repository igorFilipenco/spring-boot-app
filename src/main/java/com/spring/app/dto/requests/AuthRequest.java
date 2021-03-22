package com.spring.app.dto.requests;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class AuthRequest {
    @NotEmpty
    private String userName;
    @NotEmpty
    private String password;
}
