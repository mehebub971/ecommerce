package com.mehebub.ecommerce.service.impl;

import com.mehebub.ecommerce.dto.CartAddItemRequest;
import com.mehebub.ecommerce.dto.CartItemResponse;
import com.mehebub.ecommerce.dto.CartResponse;
import com.mehebub.ecommerce.dto.CartUpdateItemRequest;
import com.mehebub.ecommerce.entity.Cart;
import com.mehebub.ecommerce.entity.CartItem;
import com.mehebub.ecommerce.entity.Product;
import com.mehebub.ecommerce.exception.ResourceNotFoundException;
import com.mehebub.ecommerce.mapper.CartMapper;
import com.mehebub.ecommerce.repository.CartItemRepository;
import com.mehebub.ecommerce.repository.CartRepository;
import com.mehebub.ecommerce.repository.ProductRepository;
import com.mehebub.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final CartMapper cartMapper;

    @Override

    public CartResponse getCart() {

        Cart cart = getOrCreateCart();

        return buildCartResponse(cart);
    }

    @Override
    public CartResponse addItem(CartAddItemRequest request) {

        Cart cart = getOrCreateCart();

        Product product = productRepository
                .findById(request.getProductId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id: "
                                        + request.getProductId()
                        )
                );

        if (request.getQuantity() > product.getStock()) {
            throw new IllegalArgumentException(
                    "Requested quantity exceeds available stock"
            );
        }

        CartItem cartItem = cartItemRepository
                .findByCartIdAndProductId(
                        cart.getId(),
                        product.getId()
                )
                .orElse(null);

        if (cartItem != null) {

            int newQuantity =
                    cartItem.getQuantity()
                            + request.getQuantity();

            if (newQuantity > product.getStock()) {
                throw new IllegalArgumentException(
                        "Total quantity exceeds available stock"
                );
            }

            cartItem.setQuantity(newQuantity);

            cartItemRepository.save(cartItem);

        } else {

            cartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .build();

            CartItem savedItem =
                    cartItemRepository.save(cartItem);

            String itemCode = String.format(
                    "CIT%d%04d",
                    LocalDateTime.now().getYear(),
                    savedItem.getId()
            );

            savedItem.setItemCode(itemCode);

            cartItemRepository.save(savedItem);
        }

        return buildCartResponse(cart);
    }

    @Override
    public CartResponse updateItem(
            Long itemId,
            CartUpdateItemRequest request
    ) {

        CartItem cartItem = cartItemRepository
                .findById(itemId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cart item not found with id: "
                                        + itemId
                        )
                );

        Product product = cartItem.getProduct();

        if (request.getQuantity() > product.getStock()) {
            throw new IllegalArgumentException(
                    "Requested quantity exceeds available stock"
            );
        }

        cartItem.setQuantity(request.getQuantity());

        cartItemRepository.save(cartItem);

        return buildCartResponse(cartItem.getCart());
    }

    @Override
    public void deleteItem(Long itemId) {

        CartItem cartItem = cartItemRepository
                .findById(itemId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cart item not found with id: "
                                        + itemId
                        )
                );

        cartItemRepository.delete(cartItem);
    }

    @Override
    public void clearCart() {

        Cart cart = getOrCreateCart();

        cartItemRepository.deleteByCartId(cart.getId());
    }

    private Cart getOrCreateCart() {

        List<Cart> carts = cartRepository.findAll();

        if (!carts.isEmpty()) {
            return carts.get(0);
        }

        Cart cart = Cart.builder()
                .build();

        Cart savedCart = cartRepository.save(cart);

        String cartCode = String.format(
                "CRT%d%04d",
                LocalDateTime.now().getYear(),
                savedCart.getId()
        );

        savedCart.setCartCode(cartCode);

        return cartRepository.save(savedCart);
    }

    private CartResponse buildCartResponse(Cart cart) {

        List<CartItem> cartItems =
                cartItemRepository.findByCartId(cart.getId());

        List<CartItemResponse> itemResponses =
                cartItems.stream()
                        .map(cartMapper::toItemResponse)
                        .toList();

        return cartMapper.toCartResponse(
                cart,
                itemResponses
        );
    }
}