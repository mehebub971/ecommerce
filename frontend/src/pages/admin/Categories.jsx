import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import "./css/Categories.css";
import {toast} from "react-toastify";
import Swal from "sweetalert2";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });

    // Fetch categories
    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/categories");
            setCategories(response.data);
        } catch (err) {
            console.error(err);
            toast.error("Unable to load categories!");
            setError("Unable to load categories. Please check your backend.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Search categories
    const filteredCategories = useMemo(() => {
        return categories.filter(category =>
            category.name?.toLowerCase().includes(search.toLowerCase()) ||
            category.description?.toLowerCase().includes(search.toLowerCase())
        );
    }, [categories, search]);

    // Open add modal
    const handleAdd = () => {
        setEditingId(null);
        setFormData({
            name: "",
            description: ""
        });
        setError("");
        setShowModal(true);
    };

    // Open edit modal
    const handleEdit = (category) => {
        setEditingId(category.id);

        setFormData({
            name: category.name || "",
            description: category.description || ""
        });

        setError("");
        setShowModal(true);
    };

    // Input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Save category
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.warning("Category name is required!");
            setError("Category name is required.");
            return;
        }

        try {
            setError("");

            const data = {
                name: formData.name.trim(),
                description: formData.description.trim()
            };

            if (editingId) {
                await api.put(`/categories/${editingId}`, data);
                toast.success("Category update successfully!");
            } else {
                await api.post("/categories/add", data);
                toast.success("Category added successfully!");
            }

            setShowModal(false);

            setEditingId(null);

            setFormData({
                name: "",
                description: ""
            });

            await fetchCategories();

        } catch (err) {
            console.error("Category save error:", err.response?.data || err);

            setError(
                err.response?.data?.message ||
                "Unable to save category. Please try again."
            );


        }
    };

    // Delete category with SweetAlert2 + Toastify
    const handleDelete = async (id) => {

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this category!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            reverseButtons: true
        });

        if (!result.isConfirmed) return;

        try {
            await api.delete(`/categories/${id}`);

            await fetchCategories();

            toast.success("Category deleted successfully!", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored"
            });

        } catch (err) {
            console.error("Delete error:", err.response?.data || err);

            toast.error(
                err.response?.data?.message ||
                "Cannot delete category. Products may be assigned to it.",
                {
                    position: "top-right",
                    autoClose: 4000,
                    theme: "colored"
                }
            );
        }
    };

    return (
        <AdminLayout
            // title="Categories"
            // subtitle="Manage your product categories"
        >
            <div className="categories-page">

                {/* Page Header */}
                <div className="categories-top">

                    <div>
                        <h2>All Categories</h2>
                        <p>Organize and manage your store categories.</p>
                    </div>

                    <button
                        className="category-add-btn"
                        onClick={handleAdd}
                    >
                        + Add Category
                    </button>

                </div>

                {/* Statistics */}
                <div className="category-stats">

                    <div className="category-stat-card">
                        <div>
                            <span>Total Categories</span>
                            <h2>{categories.length}</h2>
                        </div>
                        <div className="category-stat-icon blue">
                            📁
                        </div>
                    </div>

                    <div className="category-stat-card">
                        <div>
                            <span>Search Results</span>
                            <h2>{filteredCategories.length}</h2>
                        </div>
                        <div className="category-stat-icon green">
                            🔍
                        </div>
                    </div>

                </div>

                {/* Search */}
                <div className="category-toolbar">

                    <div className="category-search">
                        <span>🔍</span>

                        <input
                            type="text"
                            placeholder="Search category..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <button
                        className="category-reset-btn"
                        onClick={() => setSearch("")}
                    >
                        Reset
                    </button>

                </div>

                {/* Error */}
                {error && !showModal && (
                    <div className="category-error">
                        {error}
                    </div>
                )}

                {/* Table */}
                <div className="category-table-container">

                    <table className="category-table">

                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category Name</th>
                            <th>Description</th>
                            <th>Created Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="category-empty">
                                    Loading categories...
                                </td>
                            </tr>
                        ) : filteredCategories.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="category-empty">
                                    No categories found.
                                </td>
                            </tr>
                        ) : (
                            filteredCategories.map((category, index) => (
                                <tr key={category.id}>

                                    {/* Serial Number */}
                                    <td>{index + 1}</td>

                                    <td>
                                        <div className="category-name-cell">
                                            {/*<div className="category-folder"></div>*/}
                                            <strong>{category.name}</strong>
                                        </div>
                                    </td>

                                    <td className="category-description">
                                        {category.description || "No description"}
                                    </td>

                                    <td>
                                        {category.createdAt
                                            ? new Date(category.createdAt).toLocaleDateString("en-IN")
                                            : "-"}
                                    </td>

                                    <td>
                                        <span className="category-status">Active</span>
                                    </td>

                                    <td>
                                        <div className="category-actions">
                                            <button
                                                className="category-edit-btn"
                                                title="Edit"
                                                onClick={() => handleEdit(category)}
                                            >
                                                ✏️
                                            </button>

                                            <button
                                                className="category-delete-btn"
                                                title="Delete"
                                                onClick={() => handleDelete(category.id)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>

                    </table>

                </div>

                {/* Footer */}
                <div className="category-table-footer">
                    Showing {filteredCategories.length} of {categories.length} categories
                </div>

                {/* Add/Edit Modal */}
                {showModal && (

                    <div className="category-modal-overlay">

                        <div className="category-modal">

                            <div className="category-modal-header">

                                <div>
                                    <h2>
                                        {editingId ? "Edit Category" : "Add New Category"}
                                    </h2>

                                    <p>
                                        Enter your category details below.
                                    </p>
                                </div>

                                <button
                                    className="category-modal-close"
                                    onClick={() => setShowModal(false)}
                                >
                                    ×
                                </button>

                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="category-form-group">

                                    <label>Category Name *</label>

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter category name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        maxLength={100}
                                        required
                                    />

                                </div>

                                <div className="category-form-group">

                                    <label>Description</label>

                                    <textarea
                                        name="description"
                                        placeholder="Enter category description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                    />

                                </div>

                                {error && (
                                    <div className="category-error">
                                        {error}
                                    </div>
                                )}

                                <div className="category-modal-actions">

                                    <button
                                        type="button"
                                        className="category-cancel-btn"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="category-save-btn"
                                    >
                                        {editingId ? "Update Category" : "Save Category"}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}

            </div>
        </AdminLayout>
    );
}

export default Categories;