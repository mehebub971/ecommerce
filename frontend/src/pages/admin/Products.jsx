import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import "./css/Products.css";

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Temporary data
        setProducts([
            {
                id: 1,
                name: "iPhone 15",
                sku: "IPH15-001",
                category: "Mobile",
                price: 69999,
                stockQuantity: 25,
                status: "ACTIVE",
                imageUrl: ""
            },
            {
                id: 2,
                name: "Samsung Galaxy S24",
                sku: "SAM-S24-001",
                category: "Mobile",
                price: 74999,
                stockQuantity: 18,
                status: "ACTIVE",
                imageUrl: ""
            },
            {
                id: 3,
                name: "Dell Inspiron 15",
                sku: "DELL-INS-001",
                category: "Laptop",
                price: 58999,
                stockQuantity: 8,
                status: "ACTIVE",
                imageUrl: ""
            },
            {
                id: 4,
                name: "Wireless Headphones",
                sku: "WH-001",
                category: "Accessories",
                price: 2499,
                stockQuantity: 0,
                status: "INACTIVE",
                imageUrl: ""
            }
        ]);
    }, []);

    const handleEdit = (id) => {
        console.log("Edit product:", id);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setProducts(products.filter(product => product.id !== id));
        }
    };

    return (
        <AdminLayout
            // title="Products"
            // subtitle="Manage your products and inventory"
        >
            <div className="products-page">

                {/* Top Section */}
                <div className="products-top">

                    <div>
                        <h2 className="products-title">
                            All Products
                        </h2>

                        <p className="products-count">
                            {products.length} products found
                        </p>
                    </div>

                    <button
                        className="add-product-btn"
                        onClick={() => console.log("Add Product")}
                    >
                        + Add Product
                    </button>

                </div>


                {/* Filters */}
                <div className="products-filters">

                    <div className="search-box">
                        <span>🔍</span>

                        <input
                            type="text"
                            placeholder="Search products..."
                        />
                    </div>

                    <select>
                        <option value="">All Categories</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Accessories">
                            Accessories
                        </option>
                    </select>

                    <select>
                        <option value="">All Status</option>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                    </select>

                    <button className="filter-btn">
                        Filter
                    </button>

                    <button className="reset-btn">
                        Reset
                    </button>

                </div>


                {/* Products Table */}
                <div className="products-table-container">

                    <table className="products-table">

                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>

                        {products.map((product) => (

                            <tr key={product.id}>

                                {/* Product */}
                                <td>
                                    <div className="product-info">

                                        <div className="product-image">
                                            {product.imageUrl ? (
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                />
                                            ) : (
                                                "📦"
                                            )}
                                        </div>

                                        <div>
                                            <div className="product-name">
                                                {product.name}
                                            </div>

                                            <div className="product-id">
                                                ID: #{product.id}
                                            </div>
                                        </div>

                                    </div>
                                </td>


                                {/* SKU */}
                                <td>
                                        <span className="sku">
                                            {product.sku}
                                        </span>
                                </td>


                                {/* Category */}
                                <td>
                                    {product.category}
                                </td>


                                {/* Price */}
                                <td>
                                    <strong>
                                        ₹{product.price.toLocaleString("en-IN")}
                                    </strong>
                                </td>


                                {/* Stock */}
                                <td>

                                        <span
                                            className={
                                                product.stockQuantity === 0
                                                    ? "stock out"
                                                    : product.stockQuantity < 10
                                                        ? "stock low"
                                                        : "stock"
                                            }
                                        >
                                            {product.stockQuantity === 0
                                                ? "Out of stock"
                                                : product.stockQuantity}
                                        </span>

                                </td>


                                {/* Status */}
                                <td>

                                        <span
                                            className={
                                                product.status === "ACTIVE"
                                                    ? "status active"
                                                    : "status inactive"
                                            }
                                        >
                                            {product.status}
                                        </span>

                                </td>


                                {/* Actions */}
                                <td>

                                    <div className="product-actions">

                                        <button
                                            className="edit-btn"
                                            onClick={() =>
                                                handleEdit(product.id)
                                            }
                                        >
                                            ✏️
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                        >
                                            🗑️
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>


                {/* Pagination */}
                <div className="products-pagination">

                    <span>
                        Showing 1 to {products.length} of {products.length} products
                    </span>

                    <div>
                        <button disabled>Previous</button>
                        <button className="current-page">1</button>
                        <button>Next</button>
                    </div>

                </div>

            </div>
        </AdminLayout>
    );
}

export default Products;