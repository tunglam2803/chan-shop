import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get("/admin/orders")
      .then(data => setOrders(Array.isArray(data) ? data : (data.data || [])))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-['Montserrat'] text-[24px] font-black uppercase tracking-tight text-[#111111] mb-8">
        Đơn hàng
      </h1>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-16 bg-[#F3F4F6] animate-pulse rounded-lg" />)}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white border border-[#E5E5E5] rounded-lg p-12 text-center">
          <p className="text-[#6B7280] text-[13px] uppercase tracking-widest font-bold">Chưa có đơn hàng</p>
        </div>
      ) : (
        <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#F9FAFB]">
                {["ID", "User", "Ngày đặt", "Tổng tiền", "Trạng thái"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-[#6B7280]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={o.id} className={`border-b border-[#E5E5E5] last:border-0 ${i % 2 === 0 ? "" : "bg-[#FAFAFA]"}`}>
                  <td className="px-4 py-3 font-['PT_Mono'] font-bold text-[13px]">#{o.id}</td>
                  <td className="px-4 py-3 text-[13px] text-[#111111]">{o.userId}</td>
                  <td className="px-4 py-3 text-[12px] text-[#6B7280]">
                    {new Date(o.orderDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-3 font-['PT_Mono'] font-bold text-[13px]">
                    {(o.totalAmount / 1000).toLocaleString()}K
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                      o.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}