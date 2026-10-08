package com.mehebub.ecommerce.service;

import com.mehebub.ecommerce.dto.ProductCreateRequest;
import com.mehebub.ecommerce.dto.ProductResponse;
import com.mehebub.ecommerce.dto.ProductUpdateRequest;

import java.util.List;

public interface ProductService {

    ProductResponse createProduct(ProductCreateRequest request);

    List<ProductResponse> getAllProducts();

    ProductResponse getProductById(Long id);

    ProductResponse updateProduct(Long id, ProductUpdateRequest request);

    void deleteProduct(Long id);

    List<ProductResponse> searchProducts(String name);

    List<ProductResponse> getProductsByCategory(String categoryCode);

    List<ProductResponse> getProductsByCategoryName(String categoryName);
}