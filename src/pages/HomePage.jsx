import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Danh mục nhanh tĩnh (Quick Categories)
  const quickCategories = ["Apparel", "Footwear", "Accessories", "Objects"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // 1. Thử gọi API từ Backend (Tailscale/Local)
        const data = await axiosClient.get("/products/featured");
        setProducts(Array.isArray(data) ? data : (data.products || []));
      } catch (err) {
        console.warn("⚠️ Không kết nối được API chính, chuyển sang Mock Data...");
        try {
          // 2. Fallback sang json-server (Mock Data)
          const mockRes = await fetch("http://localhost:5084/featured-products");
          if (!mockRes.ok) throw new Error("Mock Server offline");
          
          const mockData = await mockRes.json();
          setProducts(Array.isArray(mockData) ? mockData : (mockData.products || []));
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
      
      {/* ================= HERO BANNER & DANH MỤC NHANH ================= */}
      <section className="border-b border-[#111111] bg-[#F9FAFB] py-24 md:py-32 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Label */}
          <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#6B7280] mb-6 block">
            ChanShop Edition 2026
          </span>
          
          {/* Headline (Montserrat) */}
          <h1 className="font-['Montserrat'] text-[40px] md:text-[64px] font-black uppercase tracking-tighter text-[#111111] leading-[1.1] mb-8">
            The Art of <br className="hidden md:block" /> Minimal Craft
          </h1>
          
          {/* CTA Button - Tactile Interaction */}
          <button className="bg-[#111111] text-[#FFFFFF] px-8 py-4 text-[14px] font-bold uppercase tracking-widest hover:bg-[#333333] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#111111] transition-all shadow-sm">
            Shop Essentials
          </button>

          {/* Quick Categories */}
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {quickCategories.map((category) => (
              <Link 
                key={category} 
                to={`/category/${category.toLowerCase()}`}
                className="bg-[#FFFFFF] border border-[#E5E5E5] px-6 py-3 text-[14px] font-bold uppercase tracking-wide text-[#111111] hover:border-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111] transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SẢN PHẨM NỔI BẬT ================= */}
      <main className="max-w-[1200px] mx-auto py-24 px-6">
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
          /* Trạng thái Loading (Skeleton UI) */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
             {[1,2,3].map(i => (
               <div key={i} className="space-y-4">
                 <div className="aspect-[3/4] bg-[#F3F4F6] animate-pulse border border-[#E5E5E5]"></div>
                 <div className="h-4 w-3/4 bg-[#E5E5E5] animate-pulse"></div>
                 <div className="h-4 w-1/4 bg-[#E5E5E5] animate-pulse"></div>
               </div>
             ))}
          </div>
        ) : (
          /* Lưới Sản phẩm */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product) => (
              <div key={product.id} className="group relative outline-none focus-within:ring-2 focus-within:ring-[#111111] focus-within:ring-offset-4">
                
                {/* Image Container - Tactile & Grayscale */}
                <div className="relative overflow-hidden bg-[#F9FAFB] border border-[#E5E5E5] aspect-[3/4] transition-colors duration-300 group-hover:border-[#111111]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    onError={(e) => { e.target.src = "https://placehold.co/600x800/E5E5E5/111111?text=Paper+Design&font=Montserrat"; }}
                  />
                  {/* Label góc */}
                  <div className="absolute top-4 left-4 bg-[#FFFFFF] border border-[#111111] px-2 py-1">
                    <span className="text-[14px] font-bold uppercase tracking-widest text-[#111111]">
                      New
                    </span>
                  </div>
                </div>

                {/* Product Meta */}
                <div className="mt-6">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[14px] text-[#6B7280] uppercase tracking-widest font-bold">
                      {product.category || "General"}
                    </p>
                    <span className="text-[16px] font-['PT_Mono'] font-bold text-[#111111]">
                      ${product.price ? product.price.toLocaleString() : "0"}
                    </span>
                  </div>
                  
                  <h3 className="font-['Montserrat'] text-[18px] font-bold text-[#111111] uppercase tracking-tight leading-snug">
                    <Link to={`/product/${product.id}`} className="outline-none before:absolute before:inset-0">
                      {product.name}
                    </Link>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}