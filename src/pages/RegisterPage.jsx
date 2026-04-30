import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };

  const validate = () => {
    if (!form.username || !form.phoneNumber || !form.email || !form.password) {
      return "Please fill in all fields.";
    }
    if (form.password !== form.confirmPassword) {
      return "Passwords do not match.";
    }
    if (form.password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      await authService.register(
        form.username,
        form.phoneNumber,
        form.email,
        form.password
      );
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Registration failed. Please try again.";
      setError(typeof msg === "string" ? msg : "Registration failed.");
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

      <div className="relative z-10 w-full max-w-[380px] bg-white border border-[#E5E5E5] p-8 shadow-xl">
        <header className="mb-8 text-center">
          <h1 className="font-['Montserrat'] text-2xl font-bold tracking-tight text-[#111111] uppercase">
            Create Account
          </h1>
          <div className="h-1 w-12 bg-[#111111] mx-auto mt-2"></div>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Feedback Banners */}
          {error && (
            <div className="text-[11px] text-red-600 bg-red-50 border border-red-200 px-3 py-2 text-center uppercase tracking-wide">
              {error}
            </div>
          )}
          {success && (
            <div className="text-[11px] text-green-600 bg-green-50 border border-green-200 px-3 py-2 text-center uppercase tracking-wide">
              {success}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1 ml-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-[#D1D5DB] focus:border-[#111111] focus:ring-0 outline-none transition-colors placeholder:text-gray-300"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1 ml-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-[#D1D5DB] focus:border-[#111111] focus:ring-0 outline-none transition-colors placeholder:text-gray-300"
              placeholder="090 123 4567"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1 ml-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
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

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1 ml-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-[#D1D5DB] focus:border-[#111111] focus:ring-0 outline-none transition-colors placeholder:text-gray-300"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 bg-[#111111] hover:bg-[#333333] disabled:bg-[#999] text-white text-xs font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-sm"
          >
            {loading ? "Registering..." : "Register Now"}
          </button>
        </form>

        <footer className="mt-8 pt-6 border-t border-[#F3F4F6] text-center">
          <span className="text-[11px] text-[#9CA3AF] uppercase tracking-tighter">
            Already have an account?{" "}
          </span>
          <Link
            to="/login"
            className="text-[11px] text-[#111111] font-bold hover:underline transition-colors uppercase tracking-tighter"
          >
            Sign In
          </Link>
        </footer>
      </div>
    </div>
  );
}