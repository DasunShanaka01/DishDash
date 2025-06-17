package com.example.backend.OrderPlace;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceRepository extends MongoRepository<Place, ObjectId> {
    // This interface extends MongoRepository to provide CRUD operations for Place entities.
    // No additional methods are needed as the basic CRUD operations are already provided by MongoRepository.
    
}
