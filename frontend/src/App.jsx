import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/admin"
                    element={<Dashboard />}
                />

                <Route
                    path="/admin/products"
                    element={<Products />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;