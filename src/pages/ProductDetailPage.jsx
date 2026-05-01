import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, ChevronDown, ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
import axiosClient from "../api/axiosClient";
import Header from "../components/Header";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const sizes = ["S", "M", "L", "XL"];

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Try to fetch from API
        const data = await axiosClient.get("/products/featured");
        let allProducts = Array.isArray(data) ? data : (data.data || data.products || []);
        // Map backend fields
        allProducts = allProducts.map(p => ({
          ...p,
          category: p.category || "General",
          image: p.image || p.imageUrl || ""
        }));
        const foundProduct = allProducts.find((p) => p.id === parseInt(id));

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          throw new Error("Product not found in API");
        }
      } catch (err) {
        console.warn("⚠️ API not available, trying Mock Server...", err?.message);
        try {
          const mockRes = await fetch("http://localhost:5084/featured-products");
          if (!mockRes.ok) throw new Error("Mock Server offline");

          const mockData = await mockRes.json();
          let allProducts = Array.isArray(mockData) ? mockData : (mockData.products || []);
          // Map backend fields
          allProducts = allProducts.map(p => ({
            ...p,
            category: p.category || "General",
            image: p.image || p.imageUrl || ""
          }));
          const foundProduct = allProducts.find((p) => p.id === parseInt(id));

          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            throw new Error("Product not found in Mock Server");
          }
        } catch (mockErr) {
          console.error("❌ Product not found:", mockErr.message);
          setProduct(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Vui lòng chọn kích cỡ");
      return;
    }

    if (quantity < 1) {
      toast.error("Số lượng phải lớn hơn 0");
      return;
    }

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if product with same size already exists
    const existingItem = existingCart.find(
      (item) => item.id === product.id && item.size === selectedSize
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        size: selectedSize,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    toast.success(`${product.name} (${selectedSize}) x${quantity} đã thêm vào giỏ hàng!`);
    setSelectedSize("");
    setQuantity(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] font-['Roboto'] text-[#111827]">
        <Header />
        <div className="max-w-7xl mx-auto py-24 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Skeleton */}
            <div className="aspect-3/4 bg-[#F3F4F6] animate-pulse rounded border border-[#E5E5E5]"></div>

            {/* Content Skeleton */}
            <div className="space-y-6">
              <div className="h-8 w-1/3 bg-[#E5E5E5] animate-pulse rounded"></div>
              <div className="h-6 w-1/4 bg-[#E5E5E5] animate-pulse rounded"></div>
              <div className="h-10 w-1/3 bg-[#E5E5E5] animate-pulse rounded"></div>

              <div className="space-y-2">
                <div className="h-4 w-full bg-[#E5E5E5] animate-pulse rounded"></div>
                <div className="h-4 w-5/6 bg-[#E5E5E5] animate-pulse rounded"></div>
                <div className="h-4 w-4/5 bg-[#E5E5E5] animate-pulse rounded"></div>
              </div>

              <div className="h-12 w-full bg-[#E5E5E5] animate-pulse rounded"></div>
              <div className="h-12 w-full bg-[#E5E5E5] animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] font-['Roboto'] text-[#111827]">
        <Header />
        <div className="max-w-7xl mx-auto py-24 px-6 text-center">
          <p className="text-[#6B7280] mb-6">Sản phẩm không được tìm thấy</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-[#111111] text-white font-bold uppercase tracking-widest hover:bg-[#333333] transition-colors rounded"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-['Roboto'] text-[#111827]">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-[#E5E5E5] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[13px]">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[#6B7280] hover:text-[#111111] transition-colors"
          >
            <ChevronLeft size={16} />
            Quay lại
          </button>
          <span className="text-[#E5E5E5]">•</span>
          <span className="text-[#6B7280]">{product.category}</span>
          <span className="text-[#E5E5E5]">•</span>
          <span className="font-bold text-[#111111]">{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <main className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Container */}
          <div className="sticky top-24 h-fit">
            <div className="relative overflow-hidden bg-[#F9FAFB] border border-[#E5E5E5] aspect-3/4 rounded">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/600x800/E5E5E5/111111?text=Product&font=Montserrat";
                }}
              />
              {/* New Label */}
              <div className="absolute top-4 left-4 bg-[#FFFFFF] border border-[#111111] px-3 py-2 rounded">
                <span className="text-[12px] font-bold uppercase tracking-widest text-[#111111]">
                  New
                </span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <p className="text-[13px] text-[#6B7280] uppercase tracking-widest font-bold mb-2">
                {product.category}
              </p>
              <h1 className="font-['Montserrat'] text-[40px] md:text-[48px] font-black uppercase tracking-tighter text-[#111111] leading-[1.1] mb-4">
                {product.name}
              </h1>
              <span className="text-[28px] font-['PT_Mono'] font-bold text-[#111111]">
                {product.price ? `${(product.price / 1000).toLocaleString()}K` : "0"}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-3 border-t border-b border-[#E5E5E5] py-6">
              <h3 className="font-['Montserrat'] text-[14px] font-bold uppercase tracking-widest text-[#111111]">
                Mô Tả Sản Phẩm
              </h3>
              <p className="text-[14px] leading-relaxed text-[#6B7280]">
                {product.description ||
                  `Khám phá ${product.name} - một sản phẩm chất lượng cao từ bộ sưu tập ${product.category.toLowerCase()} của ChanShop. Thiết kế tối giản với chất liệu thoải mái, phù hợp cho mọi dịp. Sản phẩm được chọn lọc kỹ càng để đảm bảo độ bền và thẩm mỹ.`}
              </p>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="font-['Montserrat'] text-[14px] font-bold uppercase tracking-widest text-[#111111]">
                Chọn Kích Cỡ
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
                  className="w-full px-4 py-3 border border-[#E5E5E5] rounded text-[14px] font-bold uppercase tracking-wide text-[#111111] flex items-center justify-between hover:border-[#111111] transition-colors bg-white"
                >
                  <span>{selectedSize || "Chọn kích cỡ"}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      isSizeDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Size Dropdown */}
                {isSizeDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E5E5E5] rounded shadow-lg z-10">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setIsSizeDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-left hover:bg-[#F9FAFB] transition-colors border-b border-[#E5E5E5] last:border-b-0 ${
                          selectedSize === size ? "bg-[#111111] text-white" : "text-[#111111]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Size Guide */}
              <p className="text-[12px] text-[#6B7280] font-bold uppercase tracking-widest">
                S (35-36) • M (37-38) • L (39-40) • XL (41-42)
              </p>
            </div>

            {/* Quantity Selection */}
            <div className="space-y-3">
              <label className="font-['Montserrat'] text-[14px] font-bold uppercase tracking-widest text-[#111111]">
                Số Lượng
              </label>
              <div className="flex items-center gap-3 border border-[#E5E5E5] rounded w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-[#6B7280] hover:text-[#111111] transition-colors font-bold"
                >
                  −
                </button>
                <span className="px-6 py-3 font-bold text-[#111111] min-w-[60px] text-center border-l border-r border-[#E5E5E5]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-[#6B7280] hover:text-[#111111] transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full px-6 py-4 bg-[#111111] text-white font-['Montserrat'] font-bold uppercase text-[14px] tracking-widest rounded flex items-center justify-center gap-3 hover:bg-[#333333] transition-colors"
            >
              <ShoppingCart size={20} />
              Thêm vào giỏ hàng
            </button>

            {/* Additional Info */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E5E5E5]">
              <div className="text-center">
                <p className="text-[12px] text-[#6B7280] uppercase font-bold tracking-widest mb-2">
                  Miễn Phí
                </p>
                <p className="text-[13px] font-bold text-[#111111]">Vận Chuyển</p>
              </div>
              <div className="text-center border-l border-r border-[#E5E5E5]">
                <p className="text-[12px] text-[#6B7280] uppercase font-bold tracking-widest mb-2">
                  30 Ngày
                </p>
                <p className="text-[13px] font-bold text-[#111111]">Đổi Trả</p>
              </div>
              <div className="text-center">
                <p className="text-[12px] text-[#6B7280] uppercase font-bold tracking-widest mb-2">
                  Hỗ Trợ
                </p>
                <p className="text-[13px] font-bold text-[#111111]">24/7</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
