package com.example.backend.AddFood;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/food")
@CrossOrigin(origins = "http://localhost:5173") // Allows cross-origin requests from the specified origin
@RequiredArgsConstructor // Lombok generates a constructor for the final field
public class FoodController {

    private final FoodService foodService;


    //Get All Foods
    @GetMapping("/foods")
    public ResponseEntity<List<Food>> getAllFoods() {
        return new ResponseEntity<List<Food>>(foodService.getAllFoods(),HttpStatus.OK); // Retrieves all food items from the service
    }

    //Insert Food
    @PostMapping("/add")
    public ResponseEntity<Food> addFood(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<>(foodService.addFood(
            payload.get("name"),
            payload.get("description"),
            payload.get("price"),
            payload.get("imageUrl")
        ), HttpStatus.CREATED);
    }

    //Get Food by ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Food>> getFoodById(@PathVariable ObjectId id) {
        Optional<Food> food = foodService.findById(id);
        if (food.isPresent()) {
            return new ResponseEntity<Optional<Food>>(food, HttpStatus.OK); // Returns the food item if found
        } else {
            return new ResponseEntity<Optional<Food>>(HttpStatus.NOT_FOUND); // Returns 404 if not found
        }
    }

    //Update Food
    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(@PathVariable ObjectId id, @RequestBody Map<String, String> payload) {
        
        Optional<Food> existingFood = foodService.findById(id);
        if (existingFood.isPresent()) {
            Food food = existingFood.get();
            food.setName(payload.get("name"));
            food.setDescription(payload.get("description"));
            food.setPrice(Double.parseDouble(payload.get("price")));
            food.setImageUrl(payload.get("imageUrl"));
            return new ResponseEntity<>(foodService.updateFood(food), HttpStatus.OK); // Updates the food item
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Returns 404 if not found
        }


    }

    //Delete Food
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFood(@PathVariable ObjectId id) {
        Optional<Food> food = foodService.findById(id);
        if (food.isPresent()) {
            foodService.deleteFood(id); // Deletes the food item
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK); // Returns 204 No Content
        } else {
            return new ResponseEntity<>("User not found",HttpStatus.NOT_FOUND); // Returns 404 if not found
        }
    }




    
}
