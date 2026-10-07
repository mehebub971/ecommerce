package com.mehebub.ecommerce.service.impl;

import com.mehebub.ecommerce.dto.CategoryCreateRequest;
import com.mehebub.ecommerce.dto.CategoryResponse;
import com.mehebub.ecommerce.dto.CategoryUpdateRequest;
import com.mehebub.ecommerce.entity.Category;
import com.mehebub.ecommerce.exception.DuplicateResourceException;
import com.mehebub.ecommerce.exception.ResourceNotFoundException;
import com.mehebub.ecommerce.mapper.CategoryMapper;
import com.mehebub.ecommerce.repository.CategoryRepository;
import com.mehebub.ecommerce.service.CategoryService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;


    // =========================================================
    // CREATE CATEGORY
    // POST /api/categories
    // =========================================================

    @Override
    public CategoryResponse create(
            CategoryCreateRequest request) {

        // 1. Check duplicate category name
        if (categoryRepository.existsByNameIgnoreCase(
                request.getName().trim())) {

            throw new DuplicateResourceException(
                    "Category already exists with name: "
                            + request.getName()
            );
        }

        // 2. Convert DTO → Entity
        Category category =
                categoryMapper.toEntity(request);

        // 3. Save entity
        Category savedCategory =
                categoryRepository.save(category);

        // 4. Convert Entity → Response DTO
        return categoryMapper.toResponse(savedCategory);
    }


    // =========================================================
    // GET CATEGORY BY ID
    // GET /api/categories/{id}
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public CategoryResponse getById(Long id) {

        // 1. Find category
        Category category =
                categoryRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Category not found with id: "
                                                + id
                                )
                        );

        // 2. Entity → Response DTO
        return categoryMapper.toResponse(category);
    }


    // =========================================================
    // GET ALL CATEGORIES
    // GET /api/categories
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> getAll() {

        // 1. Get all categories
        List<Category> categories =
                categoryRepository.findAll();

        // 2. Entity List → Response DTO List
        return categories.stream()
                .map(categoryMapper::toResponse)
                .toList();
    }


    // =========================================================
    // UPDATE CATEGORY
    // PUT /api/categories/{id}
    // =========================================================

    @Override
    public CategoryResponse update(
            Long id,
            CategoryUpdateRequest request) {

        // 1. Find existing category
        Category category =
                categoryRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Category not found with id: "
                                                + id
                                )
                        );

        // 2. Check duplicate name
        boolean duplicateName =
                categoryRepository
                        .existsByNameIgnoreCaseAndIdNot(
                                request.getName().trim(),
                                id
                        );

        if (duplicateName) {

            throw new DuplicateResourceException(
                    "Category already exists with name: "
                            + request.getName()
            );
        }

        // 3. Update existing entity
        categoryMapper.updateEntity(
                category,
                request
        );

        // 4. Save updated entity
        Category updatedCategory =
                categoryRepository.save(category);

        // 5. Entity → Response DTO
        return categoryMapper.toResponse(
                updatedCategory
        );
    }


    // =========================================================
    // DELETE CATEGORY
    // DELETE /api/categories/{id}
    // =========================================================

    @Override
    public void delete(Long id) {

        // 1. Find category
        Category category =
                categoryRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Category not found with id: "
                                                + id
                                )
                        );

        // 2. Delete category
        categoryRepository.delete(category);
    }
}