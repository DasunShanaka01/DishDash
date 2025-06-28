package com.example.backend;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository // Indicates that this interface is a repository for MongoDB operations.
public interface UserRepository extends  MongoRepository<User, ObjectId> {

    Optional<User> findByPhone(String phoneNumber);
    // This interface extends MongoRepository to provide CRUD operations for User entities.
    
    
}
