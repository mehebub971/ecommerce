import "./AdminLayout.css";

function AdminHeader({ title, subtitle }) {
    return (
        <div className="admin-header">
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
    );
}

export default AdminHeader;