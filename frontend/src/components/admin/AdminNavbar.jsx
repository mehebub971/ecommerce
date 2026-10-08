import "./AdminLayout.css";

function AdminNavbar() {
    return (
        <nav className="admin-navbar">

            <div className="admin-navbar-left">
                <h2>E-Commerce Admin</h2>
            </div>

            <div className="admin-navbar-right">

                <button className="notification-btn">
                    🔔
                </button>

                <div className="admin-user">
                    <div className="admin-avatar">
                        A
                    </div>

                    <div className="admin-user-info">
                        <strong>Admin</strong>
                        <small>Administrator</small>
                    </div>
                </div>

            </div>

        </nav>
    );
}

export default AdminNavbar;