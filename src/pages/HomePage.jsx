import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

const API_ORIGIN = "https://localhost:49265";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await axiosClient.get("/products");
        let products = Array.isArray(data) ? data :
                       Array.isArray(data.data) ? data.data :
                       (data.data?.products || data.products || []);
        products = products.map(p => ({
          ...p,
          category: p.category?.name || "General",
          image: p.image || (p.imageUrl ? `${API_ORIGIN}${p.imageUrl}` : "")
        }));
        setProducts(products);
      } catch (err) {
        console.warn("⚠️ Không kết nối được API chính, chuyển sang Mock Data...", err?.message);
        try {
          const mockRes = await fetch("http://localhost:5084/featured-products");
          if (!mockRes.ok) throw new Error("Mock Server offline");
          
          const mockData = await mockRes.json();
          let products = Array.isArray(mockData) ? mockData : (mockData.products || []);
          products = products.map(p => ({
            ...p,
            category: p.category?.name || "General",
            image: p.image || (p.imageUrl ? `${API_ORIGIN}${p.imageUrl}` : "")
          }));
          setProducts(products);
        } catch (mockErr) {
          console.error("❌ Cả API và Mock đều lỗi:", mockErr.message);
          setProducts([]); 
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-['Roboto'] text-[#111827] selection:bg-[#111111] selection:text-white">
      <Header />
      
      <section className="border-b border-[#111111] bg-[#F9FAFB] py-24 md:py-32 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#6B7280] mb-6 block">
            ChanShop Edition 2026
          </span>
          <h1 className="font-['Montserrat'] text-[40px] md:text-[64px] font-black uppercase tracking-tighter text-[#111111] leading-[1.1] mb-8">
            Minimal Design <br className="hidden md:block" /> Maximum Style
          </h1>
          <button className="bg-[#111111] text-[#FFFFFF] px-8 py-4 text-[14px] font-bold uppercase tracking-widest hover:bg-[#333333] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#111111] transition-all shadow-sm">
            New Collection
          </button>
        </div>
      </section>

      <main className="max-w-300 mx-auto py-24 px-6">
        <header className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 border-b border-[#E5E5E5] pb-6 gap-4">
          <div>
            <h2 className="font-['Montserrat'] text-[24px] md:text-[32px] font-black uppercase tracking-tight text-[#111111]">
              Featured Artifacts
            </h2>
            <p className="text-[14px] text-[#6B7280] mt-2">Curated selections for everyday carry.</p>
          </div>
          <Link 
            to="/products" 
            className="text-[14px] font-bold uppercase tracking-widest text-[#111111] border-b-2 border-transparent hover:border-[#111111] focus:outline-none focus:border-[#111111] transition-all pb-1"
          >
            Browse All [→]
          </Link>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="space-y-4">
                <div className="aspect-3/4 bg-[#F3F4F6] animate-pulse border border-[#E5E5E5]"></div>
                <div className="h-4 w-3/4 bg-[#E5E5E5] animate-pulse"></div>
                <div className="h-4 w-1/4 bg-[#E5E5E5] animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}