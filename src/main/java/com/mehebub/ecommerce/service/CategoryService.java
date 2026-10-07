package com.mehebub.ecommerce.service;

import com.mehebub.ecommerce.dto.CategoryCreateRequest;
import com.mehebub.ecommerce.dto.CategoryResponse;
import com.mehebub.ecommerce.dto.CategoryUpdateRequest;

import java.util.List;

public interface CategoryService {

    CategoryResponse create(CategoryCreateRequest request);

    CategoryResponse getById(Long id);

    List<CategoryResponse> getAll();

    CategoryResponse update(
            Long id,
            CategoryUpdateRequest request
    );

    void delete(Long id);
}