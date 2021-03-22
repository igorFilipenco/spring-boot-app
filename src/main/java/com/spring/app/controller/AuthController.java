package com.spring.app.controller;

import com.spring.app.dto.requests.MessageResponse;
import com.spring.app.model.RoleEntity;
import com.spring.app.security.jwt.JwtProvider;
import com.spring.app.model.UserEntity;
import com.spring.app.dto.requests.AuthRequest;
import com.spring.app.dto.requests.AuthResponse;
import com.spring.app.dto.requests.RegistrationRequest;
import com.spring.app.service.UserService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/v1")
public class AuthController {
    private final UserService userService;
    private final JwtProvider jwtProvider;

    public AuthController(UserService userService, JwtProvider jwtProvider) {
        this.userService = userService;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/register")
    public MessageResponse registerUser(@RequestBody @Valid RegistrationRequest registrationRequest) {
        UserEntity user = new UserEntity();
        user.setPassword(registrationRequest.getPassword());
        user.setUserName(registrationRequest.getUserName());
        userService.createUser(user);

        return new MessageResponse("user created");
    }

    @PostMapping("/auth")
    public AuthResponse login(@RequestBody AuthRequest request) {
        try {
            UserEntity user = userService.findByUserNameAndPassword(request.getUserName(), request.getPassword());

            if (user == null) {
                throw new UsernameNotFoundException("User with username: " + request.getUserName() + " does not exist");
            }

            Integer id = user.getId();
            RoleEntity role = user.getRole();
            String userName = user.getUserName();
            String token = jwtProvider.generateToken(user.getUserName());

            return new AuthResponse(id, userName, role, token, "Bearer");
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }
}

