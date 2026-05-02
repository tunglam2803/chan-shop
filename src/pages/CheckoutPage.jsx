import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosClient from "../api/axiosClient";
import Header from "../components/Header";

const API_ORIGIN = "https://localhost:49265";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("momo");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng của bạn đang trống!");
      return;
    }

    setLoading(true);
    try {
      // Giả lập màn hình MoMo loading
      await new Promise(resolve => setTimeout(resolve, 1500));

      const res = await axiosClient.post("/payments/checkout");

      // Xóa giỏ hàng localStorage sau khi thanh toán thành công
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));

      toast.success("Thanh toán MoMo thành công!");
      navigate("/order-success", { 
        state: { orderId: res.orderId, total: totalPrice } 
      });
    } catch (err) {
      const msg = err?.response?.data?.message || "Thanh toán thất bại, vui lòng thử lại!";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-['Roboto'] text-[#111827]">
      <Header />

      <main className="max-w-5xl mx-auto py-16 px-6">
        <h1 className="font-['Montserrat'] text-[32px] font-black uppercase tracking-tight text-[#111111] mb-12">
          Thanh Toán
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-12 text-center rounded-lg">
            <p className="text-[#6B7280] mb-6">Không có sản phẩm để thanh toán</p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-[#111111] text-white font-bold uppercase tracking-widest hover:bg-[#333333] transition-colors rounded"
            >
              Quay lại trang chủ
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Cột trái: Danh sách sản phẩm */}
            <div className="space-y-6">
              <h2 className="font-['Montserrat'] text-[16px] font-black uppercase tracking-widest text-[#111111] border-b border-[#E5E5E5] pb-4">
                Đơn hàng ({cartItems.length} sản phẩm)
              </h2>

              <div className="space-y-3">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center gap-4 p-3 border border-[#E5E5E5] rounded-lg">
                    {/* Ảnh */}
                    <div className="w-16 h-20 flex-shrink-0 bg-[#F9FAFB] border border-[#E5E5E5] rounded overflow-hidden">
                      <img
                        src={item.image?.startsWith("/images") ? `${API_ORIGIN}${item.image}` : item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/200x240/E5E5E5/111111?text=Product&font=Montserrat";
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-[#6B7280] uppercase tracking-widest font-bold">{item.category}</p>
                      <p className="font-['Montserrat'] text-[13px] font-bold uppercase text-[#111111] truncate">{item.name}</p>
                      <p className="text-[12px] text-[#6B7280] mt-0.5">
                        Size: <span className="font-bold text-[#111111]">{item.size}</span>
                        {" · "}x{item.quantity}
                      </p>
                    </div>

                    {/* Giá */}
                    <p className="font-['PT_Mono'] font-bold text-[#111111] text-[14px] flex-shrink-0">
                      {((item.price * item.quantity) / 1000).toLocaleString()}K
                    </p>
                  </div>
                ))}
              </div>

              {/* Tổng */}
              <div className="border-t border-[#E5E5E5] pt-4 space-y-2">
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#6B7280] font-bold uppercase tracking-widest">Tạm tính</span>
                  <span className="font-['PT_Mono'] font-bold">{(totalPrice / 1000).toLocaleString()}K</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#6B7280] font-bold uppercase tracking-widest">Phí vận chuyển</span>
                  <span className="font-['PT_Mono'] font-bold text-green-600">Miễn phí</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-[#E5E5E5]">
                  <span className="font-['Montserrat'] text-[16px] font-black uppercase text-[#111111]">Tổng cộng</span>
                  <span className="font-['PT_Mono'] text-[22px] font-bold text-[#111111]">
                    {(totalPrice / 1000).toLocaleString()}K
                  </span>
                </div>
              </div>
            </div>

            {/* Cột phải: Phương thức thanh toán */}
            <div className="space-y-6">
              <h2 className="font-['Montserrat'] text-[16px] font-black uppercase tracking-widest text-[#111111] border-b border-[#E5E5E5] pb-4">
                Phương thức thanh toán
              </h2>

              {/* MoMo option */}
              <div
                onClick={() => setPaymentMethod("momo")}
                className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "momo" ? "border-[#ae2070] bg-[#fdf0f6]" : "border-[#E5E5E5] hover:border-[#ae2070]"
                }`}
              >
                {/* MoMo Logo */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-[#ae2070]">
                  <span className="text-white font-black text-[14px] tracking-tight">MoMo</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[14px] text-[#111111]">Ví MoMo</p>
                  <p className="text-[12px] text-[#6B7280]">Thanh toán nhanh qua ví điện tử MoMo</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  paymentMethod === "momo" ? "border-[#ae2070]" : "border-[#E5E5E5]"
                }`}>
                  {paymentMethod === "momo" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ae2070]" />
                  )}
                </div>
              </div>

              {/* COD option */}
              <div
                onClick={() => setPaymentMethod("cod")}
                className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "cod" ? "border-[#111111] bg-[#F9FAFB]" : "border-[#E5E5E5] hover:border-[#111111]"
                }`}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#111111]">
                  <span className="text-white font-black text-[11px] tracking-tight text-center leading-tight">COD</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[14px] text-[#111111]">Thanh toán khi nhận hàng</p>
                  <p className="text-[12px] text-[#6B7280]">Trả tiền mặt khi nhận được hàng</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  paymentMethod === "cod" ? "border-[#111111]" : "border-[#E5E5E5]"
                }`}>
                  {paymentMethod === "cod" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#111111]" />
                  )}
                </div>
              </div>

              {/* MoMo Payment UI */}
              {paymentMethod === "momo" && (
                <div className="border border-[#ae2070] rounded-lg p-5 bg-[#fdf0f6] space-y-4">
                  <p className="text-[13px] font-bold text-[#ae2070] uppercase tracking-widest">
                    Xác nhận thanh toán MoMo
                  </p>
                  <div className="flex items-center gap-3 bg-white border border-[#f0c0d8] rounded-lg p-3">
                    <div className="w-10 h-10 rounded-full bg-[#ae2070] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-black text-[10px]">MoMo</span>
                    </div>
                    <div>
                      <p className="text-[12px] text-[#6B7280]">Số tiền thanh toán</p>
                      <p className="font-['PT_Mono'] font-bold text-[#ae2070] text-[18px]">
                        {totalPrice.toLocaleString()}đ
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#6B7280]">
                    Nhấn xác nhận để hoàn tất thanh toán qua ví MoMo. Đơn hàng sẽ được xử lý ngay sau khi thanh toán thành công.
                  </p>
                </div>
              )}

              {/* Nút thanh toán */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className={`w-full py-4 font-['Montserrat'] font-black uppercase text-[14px] tracking-widest rounded-lg flex items-center justify-center gap-3 transition-all ${
                  paymentMethod === "momo"
                    ? "bg-[#ae2070] hover:bg-[#8e1858] text-white"
                    : "bg-[#111111] hover:bg-[#333333] text-white"
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Đang xử lý...
                  </>
                ) : paymentMethod === "momo" ? (
                  "Thanh toán qua MoMo"
                ) : (
                  "Xác nhận đặt hàng"
                )}
              </button>

              <Link
                to="/cart"
                className="block text-center text-[13px] font-bold uppercase tracking-widest text-[#6B7280] hover:text-[#111111] transition-colors"
              >
                ← Quay lại giỏ hàng
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}