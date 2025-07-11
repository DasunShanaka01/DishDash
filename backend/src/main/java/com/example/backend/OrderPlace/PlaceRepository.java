package com.example.backend.OrderPlace;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceRepository extends MongoRepository<Place, ObjectId> {
    Optional<Place> findByOrderId(ObjectId orderId);
    List<Place> findByUserId(String userId);
}