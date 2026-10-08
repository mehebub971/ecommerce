import "./AdminLayout.css";

function AdminSidebar() {
    return (
        <aside className="admin-sidebar">

            <div className="sidebar-title">
                ADMIN PANEL
            </div>

            <div className="sidebar-menu">

                <a href="/admin">
                    📊 Dashboard
                </a>

                <a href="/admin/products">
                    📦 Products
                </a>

                <a href="/admin/categories">
                    🗂️ Categories
                </a>

                <a href="/admin/orders">
                    🛒 Orders
                </a>

                <a href="/admin/users">
                    👥 Users
                </a>

                <a href="/admin/payments">
                    💳 Payments
                </a>

            </div>

            <div className="sidebar-bottom">

                <a href="/products">
                    🛍️ View Store
                </a>

                {/*<button className="sidebar-logout">*/}
                {/*    🚪 Logout*/}
                {/*</button>*/}

            </div>

        </aside>
    );
}

export default AdminSidebar;