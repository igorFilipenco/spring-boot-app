package com.spring.app.security;

import com.spring.app.model.UserEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;


public class CustomUserDetailsImpl implements UserDetails {
    private String userName;
    private String password;
    private Collection<? extends GrantedAuthority> grantedAuthorities;

    public static CustomUserDetailsImpl fromUserEntityToCustomUserDetails(UserEntity userEntity) {
        CustomUserDetailsImpl userDetails = new CustomUserDetailsImpl();
        userDetails.userName = userEntity.getUserName();
        userDetails.password = userEntity.getPassword();
        userDetails.grantedAuthorities = Collections.singletonList(new SimpleGrantedAuthority(userEntity.getRole().getName()));

        return userDetails;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
