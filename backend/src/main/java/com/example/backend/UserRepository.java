package com.example.backend;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends  MongoRepository<User, ObjectId> {
    // This interface extends MongoRepository to provide CRUD operations for User entities.
    // No additional methods are needed as the basic CRUD operations are already provided by MongoRepository.
    
}
