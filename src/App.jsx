import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";

// Pages
import Login from "./pages/Login";
import Sidebar from "./components/dashboard/Sidebar";
import Dashboard from "./components/dashboard/Dashboard";
import AddProduct from "./components/dashboard/ProductCreate";
import ViewProduct from "./components/dashboard/ProductsDash";
import UpdateProduct from "./components/dashboard/ProductUpdate";
import SuccessPayment from "./pages/PaymentSuccess";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Halaman umum dengan Navbar & Footer */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <AppRoutes />
              <Footer />
            </>
          }
        />

        {/* Halaman Login */}
        <Route path="/login" element={<Login />} />

        {/* Halaman Payment Success */}
        <Route path="/success-payment/:id" element={<SuccessPayment />} />

        {/* Halaman Admin Dashboard */}
        <Route element={<ProtectedAdminRoute />}>
          <Route
            path="/admin/dashboard/*"
            element={
              <div className="flex min-h-screen">
                <Sidebar />
                <Routes>
                  <Route path="" element={<Dashboard />} />
                  <Route path="products" element={<ViewProduct />} />
                  <Route path="products/create" element={<AddProduct />} />
                  <Route path="products/:id" element={<UpdateProduct />} />
                </Routes>
              </div>
            }
          />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
