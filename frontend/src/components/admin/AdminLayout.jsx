import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";

function AdminLayout({ children, title, subtitle }) {
    return (
        <div className="admin-layout">

            <AdminNavbar />

            <AdminSidebar />

            <main className="admin-main">

                <AdminHeader
                    title={title}
                    subtitle={subtitle}
                />

                <div className="admin-content">
                    {children}
                </div>

                <AdminFooter />

            </main>

        </div>
    );
}

export default AdminLayout;