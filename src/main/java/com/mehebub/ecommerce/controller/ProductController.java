package com.mehebub.ecommerce.controller;

import com.mehebub.ecommerce.dto.ProductCreateRequest;
import com.mehebub.ecommerce.dto.ProductResponse;
import com.mehebub.ecommerce.dto.ProductUpdateRequest;
import com.mehebub.ecommerce.service.ProductService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;


    // CREATE PRODUCT
    @PostMapping("/add")
    public ResponseEntity<ProductResponse> createProduct(
            @Valid @RequestBody ProductCreateRequest request) {

        ProductResponse response =
                productService.createProduct(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // GET ALL PRODUCTS
    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {

        return ResponseEntity.ok(
                productService.getAllProducts()
        );
    }


    // GET PRODUCT BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                productService.getProductById(id)
        );
    }


    // UPDATE PRODUCT
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductUpdateRequest request) {

        return ResponseEntity.ok(
                productService.updateProduct(
                        id,
                        request
                )
        );
    }


    // DELETE PRODUCT
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);

        return ResponseEntity.noContent().build();
    }


    // SEARCH PRODUCTS
    // Example: /api/products/search?name=phone
    @GetMapping("/search")
    public ResponseEntity<List<ProductResponse>> searchProducts(
            @RequestParam String name) {

        return ResponseEntity.ok(
                productService.searchProducts(name)
        );
    }


    // GET PRODUCTS BY CATEGORY
    // Example: /api/products/category/CGI20260001
    @GetMapping("/category/{categoryCode}")
    public ResponseEntity<List<ProductResponse>>
    getProductsByCategory(
            @PathVariable String categoryCode) {

        return ResponseEntity.ok(
                productService.getProductsByCategory(
                        categoryCode
                )
        );
    }

    @GetMapping("/category")
    public ResponseEntity<List<ProductResponse>>
    getProductsByCategoryName(
            @RequestParam String name) {

        return ResponseEntity.ok(
                productService.getProductsByCategoryName(name)
        );
    }

}