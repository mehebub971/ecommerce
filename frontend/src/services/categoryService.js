import api from "./api";

// Get all categories
export const getAllCategories = () => {
    return api.get("/categories");
};

// Get category by ID
export const getCategoryById = (id) => {
    return api.get(`/categories/${id}`);
};

// Add category
export const addCategory = (data) => {
    return api.post("/categories/add", data);
};

// Update category
export const updateCategory = (id, data) => {
    return api.put(`/categories/${id}`, data);
};

// Delete category
export const deleteCategory = (id) => {
    return api.delete(`/categories/${id}`);
};