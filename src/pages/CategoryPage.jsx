import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

const API_ORIGIN = "https://localhost:49265";

// Map slug URL → tên category trong DB (tiếng Việt)
const CATEGORY_MAP = {
  pants: "Quần",
  shirts: "Áo Nam",
  accessories: "Phụ Kiện",
};

const categoryTitles = {
  pants: "Pants",
  shirts: "Shirts",
  accessories: "Accessories",
};

const categoryDescriptions = {
  pants: "A collection of high-quality pants with minimalist design",
  shirts: "Shirts and t-shirts with comfortable materials and timeless style",
  accessories: "Accessories and essential items",
};

export default function CategoryPage() {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await axiosClient.get("/products");
        let allProducts = Array.isArray(data) ? data :
                          Array.isArray(data.data) ? data.data :
                          (data.data?.products || data.products || []);

        allProducts = allProducts.map(p => ({
          ...p,
          category: p.category?.name || "General",
          image: p.image || (p.imageUrl ? `${API_ORIGIN}${p.imageUrl}` : "")
        }));

        // Lọc theo category name tương ứng với slug
        const targetCategory = CATEGORY_MAP[category] || category;
        const filtered = allProducts.filter(p =>
          p.category.toLowerCase().includes(targetCategory.toLowerCase())
        );
        setFilteredProducts(filtered);
      } catch (err) {
        console.warn("⚠️ Không kết nối được API chính, chuyển sang Mock Data...", err?.message);
        try {
          const mockRes = await fetch("http://localhost:5084/featured-products");
          if (!mockRes.ok) throw new Error("Mock Server offline");

          const mockData = await mockRes.json();
          let allProducts = Array.isArray(mockData) ? mockData : (mockData.products || []);
          allProducts = allProducts.map(p => ({
            ...p,
            category: p.category?.name || "General",
            image: p.image || (p.imageUrl ? `${API_ORIGIN}${p.imageUrl}` : "")
          }));

          const targetCategory = CATEGORY_MAP[category] || category;
          const filtered = allProducts.filter(p =>
            p.category.toLowerCase().includes(targetCategory.toLowerCase())
          );
          setFilteredProducts(filtered);
        } catch (mockErr) {
          console.error("❌ Cả API và Mock đều lỗi:", mockErr.message);
          setFilteredProducts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-['Roboto'] text-[#111827]">
      <Header />

      {/* Category Hero */}
      <section className="border-b border-[#E5E5E5] bg-[#F9FAFB] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-['Montserrat'] text-[48px] font-black uppercase tracking-tighter text-[#111111] mb-4">
            {categoryTitles[category] || "Danh Mục"}
          </h1>
          <p className="text-[14px] text-[#6B7280]">
            {categoryDescriptions[category] || "Khám phá bộ sưu tập của chúng tôi"}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <main className="max-w-7xl mx-auto py-24 px-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-3/4 bg-[#F3F4F6] animate-pulse border border-[#E5E5E5] rounded"></div>
                <div className="h-4 w-3/4 bg-[#E5E5E5] animate-pulse rounded"></div>
                <div className="h-4 w-1/4 bg-[#E5E5E5] animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <p className="text-[13px] text-[#6B7280] uppercase tracking-widest font-bold mb-8">
              {filteredProducts.length} sản phẩm
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24">
            <p className="text-[#6B7280] mb-6">Không có sản phẩm trong danh mục này</p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-[#111111] text-white font-bold uppercase tracking-widest hover:bg-[#333333] transition-colors rounded"
            >
              Quay lại trang chủ
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}