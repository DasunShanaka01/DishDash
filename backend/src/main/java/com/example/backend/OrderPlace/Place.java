package com.example.backend.OrderPlace;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import org.bson.types.ObjectId;

@Document(collection = "OrderPlace")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Place {
    @Id
    private ObjectId orderId;
    private String userId;
    private String fullName;
    private String phoneNumber;
    private List<Item> items;
    private double total;
    private String address;
    private String status;
    private Date createdAt = new Date(); // Add this field

    @Data
    @NoArgsConstructor
    public static class Item {
        private String foodId;
        private String foodName; // Add this field
        private Double price;    // Add this field
        private int quantity;
    }
    
    public String getOrderId() {
        return orderId != null ? orderId.toString() : null;
    }
}