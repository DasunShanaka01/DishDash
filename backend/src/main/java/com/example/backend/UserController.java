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

@RestController // Indicates that this class is a RESTful controller.
// It combines @Controller and @ResponseBody, meaning that methods in this class will return JSON responses directly.
@RequestMapping("/api/v1") //Sets a base URL for all the endpoints in this class.
@CrossOrigin(origins = "http://localhost:5173") // Allows cross-origin requests from the specified origin.
public class UserController {

    @Autowired //Automatically injects the UserService dependency.
    private UserService userService;

    //Getting a requester user and user to gives response
    @GetMapping("/users")//Maps HTTP GET requests to specific methods.
    public ResponseEntity<List<User>> user() {
        return new ResponseEntity<List<User>>(userService.getAllUsers(),HttpStatus.OK);
    }


    @GetMapping("/users/{id}") //Maps HTTP GET requests to specific methods.
    public ResponseEntity <Optional<User>> getUser(@PathVariable ObjectId id) {
        return new ResponseEntity<Optional<User>>(userService.findById(id),HttpStatus.OK);
    }

    //Insert
    @PostMapping("/reg") //Maps HTTP POST requests to specific methods.
    public ResponseEntity<User> register(@RequestBody Map<String,String>payload) {

        return new ResponseEntity<>(userService.registerUser(
                payload.get("firstName"),
                payload.get("lastName"),
                payload.get("phone"),
                payload.get("password")
        ), HttpStatus.CREATED);

    }


}
