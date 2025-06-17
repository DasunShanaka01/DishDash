package com.example.backend.OrderPlace;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;

@Document(collection = "OrderPlace")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Place {
    
    @Id
    private ObjectId orderId;

    private String foodId;
    private String name;
    private String address;
    private String phoneNumber;

     public Place(String foodId, String name, String address, String phoneNumber) {
        this.foodId = foodId;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}
