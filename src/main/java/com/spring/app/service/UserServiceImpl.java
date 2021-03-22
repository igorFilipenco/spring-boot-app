package com.spring.app.service;

import com.spring.app.model.RoleEntity;
import com.spring.app.model.UserEntity;
import com.spring.app.repository.RoleRepository;
import com.spring.app.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<List<UserEntity>> getUserList() {
        List<UserEntity> userEntities = new ArrayList<>();
        userRepository.findAll().forEach(userEntities::add);

        if (userEntities.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        log.info("getUserList - users: users found", userEntities.size());

        return new ResponseEntity<>(userEntities, HttpStatus.OK);
    }

    public ResponseEntity<UserEntity> getOneUser(@PathVariable Integer userId) {
        Optional<UserEntity> userData = userRepository.findById(userId);

        if (!userData.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(userData.get(), HttpStatus.OK);
    }

    public ResponseEntity<UserEntity> createUser(@RequestBody UserEntity createUserRequest) {
        if (userRepository.findByUserName(createUserRequest.getUserName()) != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        UserEntity userEntity = new UserEntity();
        RoleEntity userRole = roleRepository.findByName("ROLE_TECHNICIAN");

        userEntity.setUserName(createUserRequest.getUserName());
        userEntity.setPassword(passwordEncoder.encode(createUserRequest.getPassword()));
        userEntity.setRole(userRole);

        UserEntity registeredUser = userRepository.save(userEntity);

        log.info("register - user: successfully registered", registeredUser);

        return ResponseEntity.ok(registeredUser);
    }

    public ResponseEntity<UserEntity> editUser(@RequestBody UserEntity editUserRequest, @PathVariable Integer userId) {
        Optional<UserEntity> userData = userRepository.findById(userId);

        if (!userData.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        UserEntity user = userData.get();
        user.setUserName(editUserRequest.getUserName());
        user.setPassword(editUserRequest.getPassword());

        userRepository.save(user);

        return ResponseEntity.ok().body(user);
    }

    public ResponseEntity<String> deleteUser(@PathVariable Integer userId) {
        Optional<UserEntity> user = userRepository.findById(userId);

        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exist");
        }

        userRepository.deleteById(userId);

        log.info("delete - user: successfully deleted user", user);

        return ResponseEntity.status(HttpStatus.OK).body("User with id = " + userId + " was deleted");
    }

    public UserEntity findUserByUserName(String userName) {
        UserEntity user = userRepository.findByUserName(userName);

        log.info("found - user: successfully found user", user, userName);

        return user;
    }

    public UserEntity findByUserNameAndPassword(String userName, String password) {
        UserEntity userEntity = userRepository.findByUserName(userName);

        if (userEntity != null) {
            if (passwordEncoder.matches(password, userEntity.getPassword())) {
                return userEntity;
            }
        }

        return null;
    }
}
