package com.example.backend;


import com.fasterxml.jackson.annotation.JsonGetter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;
// @Document - Marks the class as a MongoDB document.
// collection - Specifies the name of the MongoDB collection to map this class to.
@Document(collection = "user")
@Data // @Data - Generates getters, setters, toString, equals, and hashCode methods.
@AllArgsConstructor // Generates a constructor with all fields as parameters.
@NoArgsConstructor // Generates a no-argument constructor.
public class User {

    @Id // @Id - Marks the field as the primary key for the MongoDB document.
    // ObjectId - Represents a unique identifier for the document in MongoDB.
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

    //@JsonGetter - Indicates that this method should be used to serialize the `id` field to JSON.
    // This method converts the ObjectId to a String representation when serializing to JSON.
    @JsonGetter("id")
    public String getIdAsString() {
        return id != null ? id.toHexString() : null;
    }


    //The @Data annotation in your class generates the 
    //setFirstName, setLastName, setPhone, and setPassword methods automatically. 
    //That's why you're able to call these setter functions even though you don't
    // explicitly see them in your code.









    
}