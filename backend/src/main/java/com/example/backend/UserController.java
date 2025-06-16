package com.example.backend;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    //Getting a requester user and user to gives response
    @GetMapping("/users")
    public ResponseEntity<List<User>> user() {
        return new ResponseEntity<List<User>>(userService.getAllUsers(),HttpStatus.OK);
    }


    @GetMapping("/users/{id}")
    public ResponseEntity <Optional<User>> getUser(@PathVariable ObjectId id) {
        return new ResponseEntity<Optional<User>>(userService.findById(id),HttpStatus.OK);
    }

    //Insert
    @PostMapping("/reg")
    public ResponseEntity<User> register(@RequestBody Map<String,String>payload) {

        return new ResponseEntity<>(userService.registerUser(
                payload.get("firstName"),
                payload.get("lastName"),
                payload.get("phone"),
                payload.get("password")
        ), HttpStatus.CREATED);

    }


}
