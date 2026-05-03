import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, ChevronDown, LogOut } from "lucide-react";

function getUsernameFromToken() {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return (
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
      payload.name ||
      payload.username ||
      payload.sub ||
      null
    );
  } catch {
    return null;
  }
}

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  useEffect(() => {
    setUsername(getUsernameFromToken());
  }, [location]);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);
    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    // Giữ lại giỏ hàng
    setUsername(null);
    navigate("/login");
  };

  const navItems = [
    { path: "/category/pants",       label: "Pants"       },
    { path: "/category/shirts",      label: "Shirts"      },
    { path: "/category/accessories", label: "Accessories" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E5E5E5] shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo + Hi username */}
          <div className="flex flex-col leading-tight">
            <Link to="/" className="font-['Montserrat'] text-2xl font-bold text-[#111111] tracking-tight">
              ChanShop
            </Link>
            {username && (
              <span className="text-[11px] text-[#6B7280] font-bold uppercase tracking-widest">
                Hi, {username}
              </span>
            )}
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                location.pathname === "/" ? "text-[#111111]" : "text-[#9CA3AF] hover:text-[#111111]"
              }`}
            >
              Home
            </Link>

            <div className="relative">
              <button
                onClick={toggleDropdown}
                className={`flex items-center gap-1 text-sm font-bold uppercase tracking-widest transition-colors ${
                  location.pathname.includes("/category") ? "text-[#111111]" : "text-[#9CA3AF] hover:text-[#111111]"
                }`}
              >
                Category
                <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <div className={`absolute left-0 mt-2 w-48 bg-white border border-[#E5E5E5] shadow-xl rounded-lg overflow-hidden transition-all duration-200 ${
                isDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
              }`}>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeDropdown}
                    className={`block px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors border-b border-[#F3F4F6] last:border-0 ${
                      location.pathname === item.path
                        ? "bg-[#F9FAFB] text-[#111111]"
                        : "text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111111]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/about"
              className="text-sm font-bold uppercase tracking-widest text-[#9CA3AF] hover:text-[#111111] transition-colors"
            >
              About Us
            </Link>
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* Giỏ hàng */}
            <Link to="/cart" className="relative p-2 text-[#111111] hover:text-[#6B7280]">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Payment */}
            <Link
              to="/checkout"
              className="px-4 py-2 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#333333] transition-colors rounded"
            >
              Payment
            </Link>

            {/* Logout / Login */}
            {username ? (
              <button
                onClick={handleLogout}
                title="Đăng xuất"
                className="p-2 text-[#6B7280] hover:text-red-500 transition-colors"
              >
                <LogOut size={18} />
              </button>
            ) : (
              <Link
                to="/login"
                className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF] hover:text-[#111111] transition-colors"
              >
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}