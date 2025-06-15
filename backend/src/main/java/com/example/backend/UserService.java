package com.example.backend;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public List<User> getAllUsers(){
        return userRepository.findAll();

    }

    public Optional<User>findById(ObjectId id){
        return userRepository.findById(id);
    }

    @Autowired
    private MongoTemplate mongoTemplate;
    public User registerUser(String firstName, String lastName, String phone, String password){
        User user = new User(firstName, lastName, phone, password);
        userRepository.insert(user); //Insert

        return user;
    }

}