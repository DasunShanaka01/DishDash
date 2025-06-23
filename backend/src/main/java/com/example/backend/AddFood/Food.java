package com.example.backend.AddFood;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonGetter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "food")
@Data
@AllArgsConstructor // Generates a constructor with all fields as parameters.
@NoArgsConstructor
public class Food {

    @Id 
    private ObjectId id; // Unique identifier for the food item
    private String name; // Name of the food item
    private String description; // Description of the food item
    private double price; // Price of the food item
    private String imageUrl; // URL of the food item's image

    public Food(String name, String description, double price, String imageUrl) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    @JsonGetter("id")
    public String getIdAsString() {
        return id != null ? id.toHexString() : null;
    }

    
}
