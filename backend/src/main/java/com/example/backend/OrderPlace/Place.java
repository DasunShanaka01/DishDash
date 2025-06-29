package com.example.backend.OrderPlace;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    private List<Item> items;
    private double total;
    private String address;
    private String status;

    @Data
    @NoArgsConstructor
    public static class Item {
        private String foodId;
        private int quantity;
    }
}
