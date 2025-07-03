package com.example.backend.OrderPlace;

import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/order-places")
@RequiredArgsConstructor
public class PlaceController {
    private final PlaceService placeService;

    @GetMapping
    public ResponseEntity<List<Place>> getAllOrderPlaces() {
        return ResponseEntity.ok(placeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Place> getOrderPlace(@PathVariable ObjectId id) {
        return placeService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Place> createOrderPlace(@RequestBody Place place) {
        System.out.println("Received Place object: " + place.toString());
        Place saved = placeService.save(place);
        System.out.println("Saved Place object: " + saved.toString());
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Place> updateOrderPlace(@PathVariable ObjectId id, @RequestBody Place place) {
        return placeService.findById(id)
                .map(existing -> {
                    place.setOrderId(id); // preserve the original ID
                    Place updated = placeService.save(place);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderPlace(@PathVariable ObjectId id) {
        placeService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Place> updateOrderStatus(
            @PathVariable ObjectId id,
            @RequestBody Map<String, String> statusUpdate) {
        
        String newStatus = statusUpdate.get("status");
        if (newStatus == null) {
            return ResponseEntity.badRequest().build();
        }

        return placeService.updateStatus(id, newStatus)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }




}