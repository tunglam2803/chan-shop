import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await authService.login(form.username, form.password);

      const token = localStorage.getItem("access_token");
      if (!token) { setError("Không nhận được token."); return; }

      // Decode payload
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Log toàn bộ payload để xem key thực tế
      console.log("JWT Payload:", payload);

      // Thử tất cả các key có thể chứa role
      const role =
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
        payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role"] ||
        payload.role ||
        payload.Role ||
        "";

      console.log("Role found:", role);

      if (role !== "Admin") {
        localStorage.removeItem("access_token");
        setError(`Tài khoản không có quyền Admin. Role hiện tại: "${role}"`);
        return;
      }

      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Sai tài khoản hoặc mật khẩu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4 font-['Roboto']">
      <div className="w-full max-w-sm bg-white border border-[#E5E5E5] p-8 shadow-sm">
        <h1 className="font-['Montserrat'] text-[22px] font-black uppercase tracking-tight text-[#111111] text-center mb-2">
          Admin Panel
        </h1>
        <p className="text-[11px] text-[#6B7280] uppercase tracking-widest text-center mb-8">ChanShop</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-[11px] text-red-600 bg-red-50 border border-red-200 px-3 py-2 text-center tracking-wide">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1">
              Tài khoản
            </label>
            <input
              type="text"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#D1D5DB] focus:border-[#111111] outline-none transition-colors"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#D1D5DB] focus:border-[#111111] outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#111111] hover:bg-[#333333] disabled:bg-[#999] text-white text-xs font-bold uppercase tracking-widest transition-all"
          >
            {loading ? "Đang xác thực..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}