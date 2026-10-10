package com.mehebub.ecommerce.controller;

import com.mehebub.ecommerce.dto.CartAddItemRequest;
import com.mehebub.ecommerce.dto.CartResponse;
import com.mehebub.ecommerce.dto.CartUpdateItemRequest;
import com.mehebub.ecommerce.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartResponse> getCart() {

        return ResponseEntity.ok(
                cartService.getCart()
        );
    }

    @PostMapping("/items")
    public ResponseEntity<CartResponse> addItem(
            @Valid @RequestBody CartAddItemRequest request
    ) {

        return ResponseEntity.ok(
                cartService.addItem(request)
        );
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<CartResponse> updateItem(
            @PathVariable Long itemId,
            @Valid @RequestBody CartUpdateItemRequest request
    ) {

        return ResponseEntity.ok(
                cartService.updateItem(
                        itemId,
                        request
                )
        );
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> deleteItem(
            @PathVariable Long itemId
    ) {

        cartService.deleteItem(itemId);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart() {

        cartService.clearCart();

        return ResponseEntity.noContent().build();
    }
}