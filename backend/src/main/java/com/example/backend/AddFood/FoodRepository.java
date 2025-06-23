package com.example.backend.AddFood;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends MongoRepository<Food, ObjectId> {
    // This interface extends MongoRepository to provide CRUD operations for Food entities.
    // No additional methods are needed as the basic CRUD operations are already provided by MongoRepository.

    
}