package com.example.backend.AddFood;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FoodService {
    @Autowired
    private FoodRepository foodRepository;

    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    public Food addFood(String name, String description, String price, String imageUrl) {
        
        Food food = new Food(name, description, Double.parseDouble(price), imageUrl);
        foodRepository.insert(food); // Save the new food item to the database
        return food; // Return the added food item

    }

    public Food updateFood(Food food) {
        return foodRepository.save(food); // Update the food item in the database
    }

    public void deleteFood(ObjectId id) {
        foodRepository.deleteById(id); // Delete the food item by its ID
    }

    public Object addFood(String string, String string2, String string3) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addFood'");
    }

    public Optional<Food> findById(ObjectId id) {
        return foodRepository.findById(id); // Find a food item by its ID
    }


    
}
