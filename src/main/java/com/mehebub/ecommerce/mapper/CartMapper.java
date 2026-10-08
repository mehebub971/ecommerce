package com.mehebub.ecommerce.mapper;

import com.mehebub.ecommerce.dto.CartItemResponse;
import com.mehebub.ecommerce.dto.CartResponse;
import com.mehebub.ecommerce.entity.Cart;
import com.mehebub.ecommerce.entity.CartItem;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class CartMapper {

    public CartItemResponse toItemResponse(CartItem cartItem) {

        BigDecimal subtotal = cartItem.getProduct()
                .getPrice()
                .multiply(
                        BigDecimal.valueOf(cartItem.getQuantity())
                );

        return CartItemResponse.builder()
                .id(cartItem.getId())
                .itemCode(cartItem.getItemCode())
                .productId(cartItem.getProduct().getId())
                .productCode(cartItem.getProduct().getProductCode())
                .productName(cartItem.getProduct().getName())
                .price(cartItem.getProduct().getPrice())
                .quantity(cartItem.getQuantity())
                .subtotal(subtotal)
                .build();
    }

    public CartResponse toCartResponse(
            Cart cart,
            List<CartItemResponse> items
    ) {

        BigDecimal totalAmount = items.stream()
                .map(CartItemResponse::getSubtotal)
                .reduce(
                        BigDecimal.ZERO,
                        BigDecimal::add
                );

        int totalItems = items.stream()
                .mapToInt(CartItemResponse::getQuantity)
                .sum();

        return CartResponse.builder()
                .id(cart.getId())
                .cartCode(cart.getCartCode())
                .items(items)
                .totalItems(totalItems)
                .totalAmount(totalAmount)
                .createdAt(cart.getCreatedAt())
                .updatedAt(cart.getUpdatedAt())
                .build();
    }
}