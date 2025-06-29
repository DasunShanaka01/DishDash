package com.example.backend.Cart;

import java.util.List;


import org.springframework.stereotype.Service;
import org.bson.types.ObjectId;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {
    
    private final CartRepository cartRepository;

    public Cart addToCart(String userId, String foodId, int quantity) {
        Cart cartItem = new Cart(userId, foodId, quantity);
        return cartRepository.save(cartItem);
    }

    public List<Cart> getCartItemsByUserId(String userId) {
        return cartRepository.findByUserId(userId);
    }

    public void removeCartItemById(String id) {
        if (!ObjectId.isValid(id)) {
            throw new IllegalArgumentException("Invalid cart item ID: " + id);
        }
        cartRepository.deleteById(new ObjectId(id));
    }

    public Cart updateCartItemQuantity(String id, int quantity) {
        if (!ObjectId.isValid(id)) {
            throw new IllegalArgumentException("Invalid cart item ID: " + id);
        }
        Cart cartItem = cartRepository.findById(new ObjectId(id))
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartItem.setQuantity(quantity);
        return cartRepository.save(cartItem);
    }

    public void clearCart(String userId) {
        cartRepository.deleteAllById(cartRepository.findByUserId(userId).stream().map(Cart::getId).toList());
    }
}