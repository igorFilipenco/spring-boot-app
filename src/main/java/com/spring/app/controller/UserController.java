package com.spring.app.controller;

import com.spring.app.model.UserEntity;
import com.spring.app.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    final UserServiceImpl testServiceImpl;

    @Autowired
    public UserController(UserServiceImpl testServiceImpl) {
        this.testServiceImpl = testServiceImpl;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserEntity>> getUserList() {
        try {
            return testServiceImpl.getUserList();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<UserEntity> getOneUser(@PathVariable Integer userId) {
        return testServiceImpl.getOneUser(userId);
    }

    @PostMapping("/users")
    public ResponseEntity<UserEntity> createUser(@RequestBody UserEntity createUserRequest) {
        return testServiceImpl.createUser(createUserRequest);
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity<UserEntity> editUser(@RequestBody UserEntity editUserRequest, @PathVariable Integer userId) {
        return testServiceImpl.editUser(editUserRequest, userId);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer userId) {
        return testServiceImpl.deleteUser(userId);
    }
}
