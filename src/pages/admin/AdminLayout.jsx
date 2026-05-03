import { useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag, LogOut } from "lucide-react";

function getAdminRole() {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return (
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      payload.role || null
    );
  } catch { return null; }
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (getAdminRole() !== "Admin") navigate("/admin/login");
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/admin/login");
  };

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard",   icon: LayoutDashboard },
    { path: "/admin/products",  label: "Sản phẩm",    icon: Package         },
    { path: "/admin/orders",    label: "Đơn hàng",    icon: ShoppingBag     },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-['Roboto'] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#111111] text-white flex flex-col fixed h-full">
        <div className="px-6 py-6 border-b border-white/10">
          <p className="font-['Montserrat'] text-lg font-black uppercase tracking-tight">ChanShop</p>
          <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-[13px] font-bold uppercase tracking-wider transition-colors ${
                location.pathname === path
                  ? "bg-white/15 text-white"
                  : "text-white/50 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-6 py-4 text-[12px] font-bold uppercase tracking-widest text-white/40 hover:text-red-400 transition-colors border-t border-white/10"
        >
          <LogOut size={16} />
          Đăng xuất
        </button>
      </aside>

      {/* Main content */}
      <main className="ml-56 flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}