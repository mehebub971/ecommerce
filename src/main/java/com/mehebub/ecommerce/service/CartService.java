package com.mehebub.ecommerce.service;

import com.mehebub.ecommerce.dto.CartAddItemRequest;
import com.mehebub.ecommerce.dto.CartResponse;
import com.mehebub.ecommerce.dto.CartUpdateItemRequest;

public interface CartService {

    CartResponse getCart();

    CartResponse addItem(CartAddItemRequest request);

    CartResponse updateItem(
            Long itemId,
            CartUpdateItemRequest request
    );

    void deleteItem(Long itemId);

    void clearCart();
}