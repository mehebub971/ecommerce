package com.mehebub.ecommerce.mapper;

import com.mehebub.ecommerce.dto.CategoryCreateRequest;
import com.mehebub.ecommerce.dto.CategoryResponse;
import com.mehebub.ecommerce.dto.CategoryUpdateRequest;
import com.mehebub.ecommerce.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public Category toEntity(CategoryCreateRequest request) {

        return Category.builder()
                .name(request.getName().trim())
                .description(request.getDescription())
                .build();
    }

    public void updateEntity(
            Category category,
            CategoryUpdateRequest request) {

        category.setName(request.getName().trim());
        category.setDescription(request.getDescription());
    }

    public CategoryResponse toResponse(Category category) {

        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getCreatedAt(),
                category.getUpdatedAt()
        );
    }
}