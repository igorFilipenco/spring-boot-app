package com.spring.app.service;

import com.spring.app.model.UserEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface UserService {
    ResponseEntity<List<UserEntity>> getUserList();

    ResponseEntity<UserEntity> getOneUser(@PathVariable Integer userId);

    ResponseEntity<UserEntity> createUser(@RequestBody UserEntity createUserRequest);

    ResponseEntity<UserEntity> editUser(@RequestBody UserEntity editUserRequest, @PathVariable Integer userId);

    ResponseEntity<String> deleteUser(@PathVariable Integer userId);

    UserEntity findUserByUserName(String userName);

    UserEntity findByUserNameAndPassword(String userName, String password);
}
