import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();
  // State lưu trữ form, lỗi và trạng thái loading
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Xoá lỗi khi người dùng nhập lại
  };

  // Xử lý khi bấm nút Đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.username || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors
    
    try {
      console.log("🚀 Attempting login with:", { username: form.username });
      
      // Gọi API đăng nhập từ authService
      const response = await authService.login(form.username, form.password);
      
      console.log("✅ Login successful:", response);
      
      // Đăng nhập thành công -> Chuyển hướng về trang chủ
      setTimeout(() => {
        navigate("/");
      }, 500);
      
    } catch (err) {
      console.error("❌ Login error:", err);
      
      // Bắt lỗi từ backend trả về
      const msg = 
        err?.response?.data?.message || 
        err?.response?.data || 
        err?.message ||
        "Invalid credentials. Please try again.";
      
      const errorMsg = typeof msg === "string" ? msg : "Login failed.";
      console.error("Error message:", errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center p-4 font-['Roboto'] relative"
      style={{ backgroundImage: "url('/backgr.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[3px]"></div>

      <div className="relative z-10 w-full max-w-85 bg-white border border-[#E5E5E5] p-8 shadow-xl">
        <header className="mb-8 text-center">
          <h1 className="font-['Montserrat'] text-2xl font-bold tracking-tight text-[#111111] uppercase">
            Sign In
          </h1>
          <div className="h-1 w-12 bg-[#111111] mx-auto mt-2"></div>
        </header>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Hiển thị lỗi nếu có */}
          {error && (
            <div className="text-[11px] text-red-600 bg-red-50 border border-red-200 px-3 py-2 text-center uppercase tracking-wide">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1 ml-1">
              Email / Username
            </label>
            <input
              type="text" // Đổi thành text để linh hoạt nhập email hoặc username
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-[#D1D5DB] focus:border-[#111111] focus:ring-0 outline-none transition-colors placeholder:text-gray-300"
              placeholder="name@company.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1 ml-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-[#D1D5DB] focus:border-[#111111] focus:ring-0 outline-none transition-colors placeholder:text-gray-300"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#111111] hover:bg-[#333333] disabled:bg-[#999] text-white text-xs font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-sm"
          >
            {loading ? "Authenticating..." : "Authenticate"}
          </button>
        </form>

        <footer className="mt-8 pt-6 border-t border-[#F3F4F6] text-center">
          <a href="#" className="text-[11px] text-[#9CA3AF] hover:text-[#111111] transition-colors uppercase tracking-tighter">
            Forgot Password?
          </a>
          <Link to="/register" className="text-[11px] text-[#9CA3AF] hover:text-[#111111] transition-colors uppercase tracking-tighter ml-4">
            Create an account
          </Link>
        </footer>
      </div>
    </div>
  );
}