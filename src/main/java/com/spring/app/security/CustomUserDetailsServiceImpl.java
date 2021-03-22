package com.spring.app.security;

import com.spring.app.model.UserEntity;
import com.spring.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


@Component
public class CustomUserDetailsServiceImpl implements UserDetailsService {
    private final UserService userService;

    @Autowired
    public CustomUserDetailsServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public CustomUserDetailsImpl loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userService.findUserByUserName(username);

        return CustomUserDetailsImpl.fromUserEntityToCustomUserDetails(userEntity);
    }
}
