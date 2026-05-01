import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AboutPage from "./pages/AboutPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";

// Import component Footer mà chúng ta vừa tạo
import Footer from "./components/Footer"; 

function App() {
  return (
    // Sử dụng Fragment (<>...</>) để bọc các component lại
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        
        {/* Điều hướng các path lạ về trang chủ */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Footer đặt ở đây sẽ luôn hiển thị ở cuối mọi trang */}
      <Footer />
    </>
  );
}

export default App;