package com.example.backend.Cart;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonGetter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "carts") // Corrected to use 'collection' for the collection name
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cart {

    @Id
    private ObjectId id;

    private String userId;
    private String foodId;
    private int quantity;

    public Cart(String userId, String foodId, int quantity) {
        this.userId = userId;
        this.foodId = foodId;
        this.quantity = quantity;
    }

    @JsonGetter("id")
    public String getIdAsString() {
        return id != null ? id.toHexString() : null;
    }
}