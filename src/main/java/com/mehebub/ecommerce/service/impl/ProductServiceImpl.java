package com.mehebub.ecommerce.service.impl;

import com.mehebub.ecommerce.dto.ProductCreateRequest;
import com.mehebub.ecommerce.dto.ProductResponse;
import com.mehebub.ecommerce.dto.ProductUpdateRequest;
import com.mehebub.ecommerce.entity.Category;
import com.mehebub.ecommerce.entity.Product;
import com.mehebub.ecommerce.exception.ResourceNotFoundException;
import com.mehebub.ecommerce.mapper.ProductMapper;
import com.mehebub.ecommerce.repository.CategoryRepository;
import com.mehebub.ecommerce.repository.ProductRepository;
import com.mehebub.ecommerce.service.ProductService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;


    // CREATE PRODUCT
    @Override
    public ProductResponse createProduct(
            ProductCreateRequest request) {

        // 1. Check whether category exists
        categoryRepository
                .findByCategoryCode(request.getCategoryCode().trim())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Category not found with code: "
                                        + request.getCategoryCode()
                        )
                );

        // 2. Convert DTO → Entity
        Product product =
                productMapper.toEntity(request);

        // 3. Save product first
        Product savedProduct =
                productRepository.save(product);

        // 4. Generate product code
        String productCode = String.format(
                "PRI%d%04d",
                LocalDateTime.now().getYear(),
                savedProduct.getId()
        );

        // 5. Set product code
        savedProduct.setProductCode(productCode);

        // 6. Save again
        savedProduct =
                productRepository.save(savedProduct);

        // 7. Return response
        return productMapper.toResponse(savedProduct);
    }


    // GET ALL PRODUCTS
    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts() {

        List<Product> products =
                productRepository.findAll();

        return products.stream()
                .map(productMapper::toResponse)
                .toList();
    }


    // GET PRODUCT BY ID
    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {

        Product product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found with id: "
                                                + id
                                )
                        );

        return productMapper.toResponse(product);
    }


    // UPDATE PRODUCT
    @Override
    public ProductResponse updateProduct(
            Long id,
            ProductUpdateRequest request) {

        // 1. Find existing product
        Product product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found with id: "
                                                + id
                                )
                        );

        // 2. Check whether new category exists
        categoryRepository
                .findByCategoryCode(request.getCategoryCode().trim())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Category not found with code: "
                                        + request.getCategoryCode()
                        )
                );

        // 3. Update entity
        productMapper.updateEntity(
                product,
                request
        );

        // 4. Save updated product
        Product updatedProduct =
                productRepository.save(product);

        // 5. Return response
        return productMapper.toResponse(
                updatedProduct
        );
    }


    // DELETE PRODUCT
    @Override
    public void deleteProduct(Long id) {

        Product product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found with id: "
                                                + id
                                )
                        );

        productRepository.delete(product);
    }


    // SEARCH PRODUCTS BY NAME
    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> searchProducts(
            String name) {

        List<Product> products =
                productRepository
                        .findByNameContainingIgnoreCase(
                                name.trim()
                        );

        return products.stream()
                .map(productMapper::toResponse)
                .toList();
    }


    // GET PRODUCTS BY CATEGORY
    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getProductsByCategory(
            String categoryCode) {

        // Check category exists
        categoryRepository
                .findByCategoryCode(categoryCode.trim())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Category not found with code: "
                                        + categoryCode
                        )
                );

        List<Product> products =
                productRepository
                        .findByCategoryCode(
                                categoryCode.trim()
                        );

        return products.stream()
                .map(productMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getProductsByCategoryName(
            String categoryName) {

        Category category =
                categoryRepository
                        .findByNameIgnoreCase(categoryName.trim())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Category not found with name: "
                                                + categoryName
                                )
                        );

        List<Product> products =
                productRepository.findByCategoryCode(
                        category.getCategoryCode()
                );

        return products.stream()
                .map(productMapper::toResponse)
                .toList();
    }
}