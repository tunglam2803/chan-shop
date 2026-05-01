import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);

  const sizes = ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Vui lòng chọn kích cỡ");
      return;
    }

    // Get existing cart or create new one
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if product with same size already exists
    const existingItem = existingCart.find(
      (item) => item.id === product.id && item.size === selectedSize
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        size: selectedSize,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    toast.success(`${product.name} (${selectedSize}) đã thêm vào giỏ hàng!`);
    setSelectedSize("");
  };

  return (
    <div className="group relative outline-none focus-within:ring-2 focus-within:ring-[#111111] focus-within:ring-offset-4">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-[#F9FAFB] border border-[#E5E5E5] aspect-3/4 transition-colors duration-300 group-hover:border-[#111111] rounded">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/500x600/E5E5E5/111111?text=Product&font=Montserrat";
          }}
        />
        {/* New Label */}
        <div className="absolute top-3 left-3 bg-[#FFFFFF] border border-[#111111] px-2 py-1 rounded">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#111111]">
            New
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[12px] text-[#6B7280] uppercase tracking-widest font-bold">
            {product.category || "General"}
          </p>
          <span className="text-[14px] font-['PT_Mono'] font-bold text-[#111111]">
            {product.price ? `${(product.price / 1000).toLocaleString()}K` : "0"}
          </span>
        </div>

        <h3 className="font-['Montserrat'] text-[14px] font-bold text-[#111111] uppercase tracking-tight leading-snug hover:text-[#6B7280] transition-colors mb-3">
          <Link to={`/product/${product.id}`} className="outline-none">
            {product.name}
          </Link>
        </h3>

        {/* Size Selection */}
        <div className="relative mb-3">
          <button
            onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
            className="w-full px-3 py-2 border border-[#E5E5E5] rounded text-[13px] font-bold uppercase tracking-wide text-[#111111] flex items-center justify-between hover:border-[#111111] transition-colors bg-white"
          >
            <span>{selectedSize || "Chọn kích cỡ"}</span>
            <ChevronDown
              size={14}
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
                  className={`w-full px-3 py-2 text-[13px] font-bold uppercase tracking-wide text-left hover:bg-[#F9FAFB] transition-colors ${
                    selectedSize === size ? "bg-[#111111] text-white" : "text-[#111111]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full px-4 py-3 bg-[#111111] text-white font-bold uppercase text-[12px] tracking-widest rounded flex items-center justify-center gap-2 hover:bg-[#333333] transition-colors"
        >
          <ShoppingCart size={16} />
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
