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

    //Find user by phone
    public Optional<User> findByPhone(String phone) {
        return userRepository.findByPhone(phone); // Custom query to find a user by email

    }

    public boolean login(String phoneNumber,String password){
        Optional<User> user = findByPhone(phoneNumber); // Find user by phone number
        if (user.isPresent()) {
            String dbPassword = user.get().getPassword(); // Get the password from the database
            System.out.println("Database password: " + dbPassword); // Print database password
            System.out.println("Provided password: " + password); // Print provided password
            return dbPassword.equals(password); // Check if the password matches
        }
        else{
            System.out.println("User not found for phone: " + phoneNumber);
            return false; // Return false if user not found
        }
        
    }



}
