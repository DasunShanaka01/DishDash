package com.example.backend.AddFood;

import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final FoodRepository foodRepository;

    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    public Food addFood(String name, String description, String price,String category, String imageUrl) {
        Food food = new Food();
        food.setName(name);
        food.setDescription(description);
        food.setPrice(Double.parseDouble(price));
        food.setCategory(category); // Set the new category field
        food.setImageUrl(imageUrl);
        return foodRepository.save(food);
    }

    public Optional<Food> findById(ObjectId id) {
        return foodRepository.findById(id);
    }

    public Food updateFood(Food food) {
        return foodRepository.save(food);
    }

    public void deleteFood(ObjectId id) {
        foodRepository.deleteById(id);
    }
}