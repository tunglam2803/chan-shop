import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Header from "../components/Header";

const API_ORIGIN = "https://localhost:49265";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const updateQuantity = (id, size, delta) => {
    const updated = cartItems.map(item => {
      if (item.id === id && item.size === size) {
        const newQty = item.quantity + delta;
        return newQty < 1 ? null : { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id, size) => {
    const updated = cartItems.filter(item => !(item.id === id && item.size === size));
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-['Roboto'] text-[#111827]">
      <Header />

      <main className="max-w-4xl mx-auto py-24 px-6">
        <h1 className="font-['Montserrat'] text-[32px] font-black uppercase tracking-tight text-[#111111] mb-12">
          Giỏ Hàng
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-12 text-center rounded-lg">
            <p className="text-[#6B7280] mb-6">Giỏ hàng của bạn trống</p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-[#111111] text-white font-bold uppercase tracking-widest hover:bg-[#333333] transition-colors rounded"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Danh sách sản phẩm */}
            <div className="border border-[#E5E5E5] rounded-lg overflow-hidden">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className={`flex items-center gap-4 p-4 ${
                    index !== cartItems.length - 1 ? "border-b border-[#E5E5E5]" : ""
                  }`}
                >
                  {/* Ảnh */}
                  <div className="w-20 h-24 flex-shrink-0 bg-[#F9FAFB] border border-[#E5E5E5] rounded overflow-hidden">
                    <img
                      src={item.image?.startsWith("/images") ? `${API_ORIGIN}${item.image}` : item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/200x240/E5E5E5/111111?text=Product&font=Montserrat";
                      }}
                    />
                  </div>

                  {/* Thông tin */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-[#6B7280] uppercase tracking-widest font-bold mb-1">
                      {item.category}
                    </p>
                    <h3 className="font-['Montserrat'] text-[14px] font-bold uppercase tracking-tight text-[#111111] truncate">
                      {item.name}
                    </h3>
                    <p className="text-[12px] text-[#6B7280] mt-1">Size: <span className="font-bold text-[#111111]">{item.size}</span></p>
                  </div>

                  {/* Số lượng */}
                  <div className="flex items-center border border-[#E5E5E5] rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, -1)}
                      className="px-3 py-2 text-[#6B7280] hover:text-[#111111] font-bold transition-colors"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 font-bold text-[#111111] text-[14px] border-l border-r border-[#E5E5E5] min-w-[40px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, 1)}
                      className="px-3 py-2 text-[#6B7280] hover:text-[#111111] font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Giá */}
                  <div className="text-right min-w-[80px]">
                    <p className="font-['PT_Mono'] font-bold text-[#111111] text-[14px]">
                      {((item.price * item.quantity) / 1000).toLocaleString()}K
                    </p>
                  </div>

                  {/* Xóa */}
                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="p-2 text-[#6B7280] hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Tổng tiền */}
            <div className="border border-[#E5E5E5] rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center text-[14px] text-[#6B7280]">
                <span className="font-bold uppercase tracking-widest">Tạm tính</span>
                <span className="font-['PT_Mono'] font-bold">{(totalPrice / 1000).toLocaleString()}K</span>
              </div>
              <div className="flex justify-between items-center text-[14px] text-[#6B7280]">
                <span className="font-bold uppercase tracking-widest">Phí vận chuyển</span>
                <span className="font-['PT_Mono'] font-bold text-green-600">Miễn phí</span>
              </div>
              <div className="border-t border-[#E5E5E5] pt-4 flex justify-between items-center">
                <span className="font-['Montserrat'] text-[16px] font-black uppercase tracking-tight text-[#111111]">Tổng cộng</span>
                <span className="font-['PT_Mono'] text-[20px] font-bold text-[#111111]">
                  {(totalPrice / 1000).toLocaleString()}K
                </span>
              </div>
            </div>

            {/* Nút thanh toán */}
            <div className="flex gap-4">
              <Link
                to="/"
                className="flex-1 px-6 py-4 border border-[#111111] text-[#111111] font-bold uppercase text-[13px] tracking-widest rounded text-center hover:bg-[#F9FAFB] transition-colors"
              >
                Tiếp tục mua sắm
              </Link>
              <Link
                to="/checkout"
                className="flex-1 px-6 py-4 bg-[#111111] text-white font-bold uppercase text-[13px] tracking-widest rounded text-center hover:bg-[#333333] transition-colors"
              >
                Thanh toán
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}