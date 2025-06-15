package com.example.backend;


import com.fasterxml.jackson.annotation.JsonGetter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;

@Document(collection = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private ObjectId id;

    private String firstName;
    private String lastName;
    private String phone;
    private String password;

    public User(String firstName, String lastName, String phone, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.password = password;
    }

    @JsonGetter("id")
    public String getIdAsString() {
        return id != null ? id.toHexString() : null;
    }
}