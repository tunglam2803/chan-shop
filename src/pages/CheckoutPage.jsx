import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] font-['Roboto']">
      <Header />
      
      <main className="max-w-4xl mx-auto py-24 px-6">
        <h1 className="font-['Montserrat'] text-[32px] font-bold uppercase tracking-tight text-[#111111] mb-8">
          Thanh Toán
        </h1>
        
        <div className="bg-gray-50 border border-[#E5E5E5] p-12 text-center rounded-lg">
          <p className="text-[#6B7280] mb-6">Không có sản phẩm để thanh toán</p>
          <Link 
            to="/"
            className="inline-block px-6 py-3 bg-[#111111] text-white font-bold uppercase tracking-widest hover:bg-[#333333] transition-colors rounded"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </main>
    </div>
  );
}
