import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import { Package, ShoppingBag, DollarSign, Users } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosClient.get("/admin/dashboard")
      .then(data => setStats(data.data || data))
      .catch(() => {});
  }, []);

  const cards = [
    { label: "Tổng đơn hàng",  value: stats?.totalOrders   ?? 0, icon: ShoppingBag, color: "bg-blue-50  text-blue-600"  },
    { label: "Sản phẩm",       value: stats?.totalProducts ?? 0, icon: Package,     color: "bg-green-50 text-green-600" },
    { label: "Người dùng",     value: stats?.totalUsers    ?? 0, icon: Users,       color: "bg-amber-50 text-amber-600" },
    { label: "Doanh thu",      value: stats ? `${(stats.totalRevenue / 1000).toLocaleString()}K` : "0K",
      icon: DollarSign, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div>
      <h1 className="font-['Montserrat'] text-[24px] font-black uppercase tracking-tight text-[#111111] mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-[#E5E5E5] rounded-lg p-6">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${color}`}>
              <Icon size={20} />
            </div>
            <p className="text-[11px] text-[#6B7280] uppercase tracking-widest font-bold mb-1">{label}</p>
            <p className="font-['Montserrat'] text-[28px] font-black text-[#111111]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}