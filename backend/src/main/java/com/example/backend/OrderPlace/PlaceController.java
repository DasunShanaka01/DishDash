package com.example.backend.OrderPlace;

import java.util.List;

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

    /* ---------- GET all ---------- */
    @GetMapping
    public ResponseEntity<List<Place>> getAllOrderPlaces() {
        return ResponseEntity.ok(placeService.findAll());
    }

    /* ---------- GET by ID ---------- */
    @GetMapping("/{id}")
    public ResponseEntity<Place> getOrderPlace(@PathVariable ObjectId id) {
        return placeService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /* ---------- POST create ---------- */
    @PostMapping
    public ResponseEntity<Place> createOrderPlace(@RequestBody Place place) {
        Place saved = placeService.save(place);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /* ---------- PUT update ---------- */
    @PutMapping("/{id}")
    public ResponseEntity<Place> updateOrderPlace(@PathVariable ObjectId id,
                                                  @RequestBody Place place) {
        return placeService.findById(id)
                .map(existing -> {
                    place.setOrderId(id);           // preserve the original ID
                    Place updated = placeService.save(place);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /* ---------- DELETE ---------- */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderPlace(@PathVariable ObjectId id) {
        placeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
