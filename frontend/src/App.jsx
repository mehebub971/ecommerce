import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Categories from "./pages/admin/Categories";
import Navbar from "./pages/admin/Navbar";
import SubNavbar from "./pages/admin/SubNavbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/products" element={<Products />} />
                <Route path="/admin/categories" element={<Categories />} />
                <Route path="/admin/navbar" element={<Navbar />} />
                <Route path="/admin/sub-navbar" element={<SubNavbar />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="colored"
            />
        </BrowserRouter>
    );
}

export default App;