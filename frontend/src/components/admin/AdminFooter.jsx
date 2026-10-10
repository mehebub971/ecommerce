import "./AdminLayout.css";

function AdminFooter() {
    return (
        <footer className="admin-footer">
            <div>
                © {new Date().getFullYear()} E-Commerce Admin Panel
            </div>

            <div>
                All rights reserved.
            </div>
        </footer>
    );
}

export default AdminFooter;