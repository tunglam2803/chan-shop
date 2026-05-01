import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] font-['Roboto']">
      <Header />
      
      <main className="max-w-4xl mx-auto py-24 px-6">
        <h1 className="font-['Montserrat'] text-[32px] font-bold uppercase tracking-tight text-[#111111] mb-8">
          Giỏ Hàng
        </h1>
        
        <div className="bg-gray-50 border border-[#E5E5E5] p-12 text-center rounded-lg">
          <p className="text-[#6B7280] mb-6">Giỏ hàng của bạn trống</p>
          <Link 
            to="/"
            className="inline-block px-6 py-3 bg-[#111111] text-white font-bold uppercase tracking-widest hover:bg-[#333333] transition-colors rounded"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </main>
    </div>
  );
}
