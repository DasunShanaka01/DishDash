package com.example.backend.Cart;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173") 
@RequiredArgsConstructor
public class CartController {
    
    private final CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Cart>> getCartItems(@PathVariable String userId) {
        List<Cart> cartItems = cartService.getCartItemsByUserId(userId);
        if (cartItems.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(cartItems, HttpStatus.OK);
    }

    @PostMapping("/clear/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable String userId) {
        try {
            cartService.clearCart(userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addCart(@RequestBody Map<String, String> payload) {
        String userId = payload.get("userId");
        String foodId = payload.get("foodId");
        String quantityStr = payload.get("quantity");

        if (userId == null || foodId == null || quantityStr == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {
            int quantity = Integer.parseInt(quantityStr);
            Cart cartItem = cartService.addToCart(userId, foodId, quantity);
            return new ResponseEntity<>(cartItem, HttpStatus.CREATED);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/remove/{id}")
    public ResponseEntity<Void> removeCartItem(@PathVariable String id) {
        try {
            cartService.removeCartItemById(id); // Updated method name
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<Cart> updateCartItem(@PathVariable String id, @RequestBody Map<String, String> payload) {
        String quantityStr = payload.get("quantity");
        if (quantityStr == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {
            int quantity = Integer.parseInt(quantityStr);
            Cart updatedCartItem = cartService.updateCartItemQuantity(id, quantity); // Updated method name
            return new ResponseEntity<>(updatedCartItem, HttpStatus.OK);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}