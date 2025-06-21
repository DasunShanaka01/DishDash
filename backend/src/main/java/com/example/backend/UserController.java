package com.example.backend;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpSession;

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

    // Optional -> It was introduced to handle situations where you might deal with null values, but without directly using null.

    @GetMapping("/users/{id}") //Maps HTTP GET requests to specific methods.
    public ResponseEntity <Optional<User>>getUser(@PathVariable ObjectId id) {
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

    //Login
    @PostMapping("/login")
    //The login method is public and will handle the request. It takes a JSON payload (received as a map of key-value pairs) as input
    //Key: "phone"
    // Value: "0771234567" (the user's phone number used for login)
    // Key: "password"
    // Value: "securePass123" (the user's password)
    public ResponseEntity<String> login(@RequestBody Map<String, String> payload) {
    // When multiple requests are being processed concurrently, logs can become cluttered.
    //A unique requestId helps to correlate all log entries related to a specific request, making it easier to trace the flow of execution.
    String requestId = UUID.randomUUID().toString();
    
    //Logs the request ID and the received payload to the console.
    System.out.println("Request ID: " + requestId + ", Payload received: " + payload);
    String phoneNumber = payload.get("phone");
    String password = payload.get("password");
    
    //Logs the phone number and password received in the payload.
    //This login method return true execute in if part and false in else part. 
    if (userService.login(phoneNumber, password)) {
        System.out.println("Request ID: " + requestId + ", Login successful for phone: " + phoneNumber);
        return new ResponseEntity<>("Login successful", HttpStatus.OK);
    } else {
        System.out.println("Request ID: " + requestId + ", Invalid login attempt for phone: " + phoneNumber);
        return new ResponseEntity<>("Invalid phone number or password", HttpStatus.UNAUTHORIZED);
    }
}


}   




