import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, ChevronDown } from "lucide-react";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation(); // Lấy URL hiện tại

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  // Danh sách categories để render nhanh
  const navItems = [
    { path: "/category/pants", label: "Pants" },
    { path: "/category/shirts", label: "Shirts" },
    { path: "/category/accessories", label: "Accessories" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E5E5E5] shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-['Montserrat'] text-2xl font-bold text-[#111111] tracking-tight">
            ChanShop
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                location.pathname === "/" ? "text-[#111111]" : "text-[#9CA3AF] hover:text-[#111111]"
              }`}
            >
              Home
            </Link>

            {/* Category Dropdown */}
            <div className="relative group">
              <button
                onClick={toggleDropdown}
                className={`flex items-center gap-1 text-sm font-bold uppercase tracking-widest transition-colors ${
                  location.pathname.includes("/category") ? "text-[#111111]" : "text-[#9CA3AF] hover:text-[#111111]"
                }`}
              >
                Category
                <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute left-0 mt-2 w-48 bg-white border border-[#E5E5E5] shadow-xl rounded-lg overflow-hidden transition-all duration-200 ${
                isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeDropdown}
                    className={`block px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors border-b border-[#F3F4F6] last:border-0 ${
                      location.pathname === item.path ? "bg-[#F9FAFB] text-[#111111]" : "text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111111]"
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

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-[#111111] hover:text-[#6B7280]">
              <ShoppingCart size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
            </Link>
            <Link to="/checkout" className="px-4 py-2 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#333333] transition-colors rounded">
              Payment
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}