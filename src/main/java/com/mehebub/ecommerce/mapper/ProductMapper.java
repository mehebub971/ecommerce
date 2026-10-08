package com.mehebub.ecommerce.mapper;

import com.mehebub.ecommerce.dto.ProductCreateRequest;
import com.mehebub.ecommerce.dto.ProductResponse;
import com.mehebub.ecommerce.dto.ProductUpdateRequest;
import com.mehebub.ecommerce.entity.Product;
import org.springframework.stereotype.Component;


@Component
public class ProductMapper {
    public Product toEntity(ProductCreateRequest request) {
        return Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stock(request.getStock())
                .categoryCode(request.getCategoryCode())
                .build();

    }
    public ProductResponse toResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .productCode(product.getProductCode())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .categoryCode(product.getCategoryCode())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }
    public void updateEntity(
            Product product,
            ProductUpdateRequest request
    ) {
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setCategoryCode(request.getCategoryCode());
    }
}
