package com.example.backend;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service //Marks a class as a service that contains business logic.
public class UserService {

    @Autowired // Automatically injects the UserRepository dependency.
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findById(ObjectId id) {
        return userRepository.findById(id);
    }

    // Method to register a new user
    public User registerUser(String firstName, String lastName, String phone, String password) {
        User user = new User(firstName, lastName, phone, password);
        userRepository.insert(user); // Insert into the database
        return user;
    }
}
