package com.example.backend.OrderPlace;

import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlaceService {
    private final PlaceRepository placeRepository;

    public List<Place> findAll() {
        return placeRepository.findAll();
    }

    public Optional<Place> findById(ObjectId id) {
        return placeRepository.findById(id);
    }

    public Place save(Place place) {
        return placeRepository.save(place);
    }

    public void delete(ObjectId id) {
        placeRepository.deleteById(id);
    }

     public Optional<Place> updateStatus(ObjectId orderId, String newStatus) {
        return placeRepository.findByOrderId(orderId)
                .map(order -> {
                    order.setStatus(newStatus);
                    return placeRepository.save(order);
                });
    }


}