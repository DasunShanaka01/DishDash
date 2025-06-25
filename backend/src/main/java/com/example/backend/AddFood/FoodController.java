package com.example.backend.AddFood;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/food")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class FoodController {

    private final FoodService foodService;

    // Directory to save uploaded files
    private static final String UPLOAD_DIR = "backend/uploads/";

    // Get All Foods
    @GetMapping("/foods")
    public ResponseEntity<List<Food>> getAllFoods() {
        return new ResponseEntity<>(foodService.getAllFoods(), HttpStatus.OK);
    }

    // Insert Food with File Upload
    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ResponseEntity<Food> addFood(
            @RequestPart("name") String name,
            @RequestPart("description") String description,
            @RequestPart("price") String price,
            @RequestPart("category") String category, // New field
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        try {
            String imageUrl = null;
            if (imageFile != null && !imageFile.isEmpty()) {
                // Save the file to the server
                String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
                Path filePath = Paths.get(UPLOAD_DIR + fileName);
                Files.createDirectories(filePath.getParent()); // Create directories if they don't exist
                Files.write(filePath, imageFile.getBytes());
                imageUrl = "/uploads/" + fileName; // Relative URL to access the file
            }

            // Add food to the database
            Food food = foodService.addFood(name, description, price,category,imageUrl);
            return new ResponseEntity<>(food, HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get Food by ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Food>> getFoodById(@PathVariable ObjectId id) {
        Optional<Food> food = foodService.findById(id);
        return food.isPresent()
                ? new ResponseEntity<>(food, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    // Update Food with File Upload
    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<Food> updateFood(
            @PathVariable ObjectId id,
            @RequestPart("name") String name,
            @RequestPart("description") String description,
            @RequestPart("price") String price,
            @RequestPart("category") String category, // New field
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        try {
            Optional<Food> existingFood = foodService.findById(id);
            if (existingFood.isPresent()) {
                Food food = existingFood.get();
                food.setName(name);
                food.setDescription(description);
                food.setPrice(Double.parseDouble(price));
                food.setCategory(category); // Update the category field

                // Handle file upload if provided
                if (imageFile != null && !imageFile.isEmpty()) {
                    String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
                    Path filePath = Paths.get(UPLOAD_DIR + fileName);
                    Files.createDirectories(filePath.getParent());
                    Files.write(filePath, imageFile.getBytes());
                    food.setImageUrl("/uploads/" + fileName);
                }

                Food updatedFood = foodService.updateFood(food);
                return new ResponseEntity<>(updatedFood, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete Food
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFood(@PathVariable ObjectId id) {
        Optional<Food> food = foodService.findById(id);
        if (food.isPresent()) {
            foodService.deleteFood(id);
            return new ResponseEntity<>("Food deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Food not found", HttpStatus.NOT_FOUND);
    }

}