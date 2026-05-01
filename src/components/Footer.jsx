import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
// Import icon thương hiệu từ Font Awesome (nằm trong bộ react-icons)
import { FaFacebookF, FaInstagram } from "react-icons/fa6"; 

export default function Footer() {
  return (
    <footer className="bg-[#FFFFFF] border-t border-gray-100 pt-16 pb-8 font-['Roboto']">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Cột 1: Brand */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="font-['Montserrat'] text-2xl font-bold tracking-tighter text-[#111111] mb-4">
              CHAN<span className="font-light">SHOP</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Nâng tầm phong cách cá nhân với triết lý tối giản. Chúng tôi tin rằng cái đẹp thực sự đến từ sự tinh tế và chất lượng bền bỉ.
            </p>
          </div>

          {/* Cột 2: Khám phá */}
          <div>
            <h3 className="font-['Montserrat'] text-sm font-bold uppercase tracking-widest text-[#111111] mb-6">
              Khám phá
            </h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black hover:translate-x-1 transition-all inline-block">Bộ sưu tập mới</a></li>
              <li><a href="#" className="hover:text-black hover:translate-x-1 transition-all inline-block">Về ChanShop</a></li>
              <li><a href="#" className="hover:text-black hover:translate-x-1 transition-all inline-block">Chính sách bảo mật</a></li>
            </ul>
          </div>

          {/* Cột 3: Liên hệ (Lucide Icons) */}
          <div>
            <h3 className="font-['Montserrat'] text-sm font-bold uppercase tracking-widest text-[#111111] mb-6">
              Liên hệ
            </h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start gap-3 group">
                <MapPin size={18} className="text-gray-400 group-hover:text-red-500 transition-colors shrink-0" />
                <span>Quận Hai Bà Trưng, Hà Nội</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone size={18} className="text-gray-400 group-hover:text-green-500 transition-colors shrink-0" />
                <a href="tel:0901234567" className="hover:text-black transition-colors">090 123 4567</a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors shrink-0" />
                <a href="mailto:contact@chanshop.vn" className="hover:text-black transition-colors">contact@chanshop.vn</a>
              </li>
            </ul>
          </div>

          {/* Cột 4: Social (React Icons - Fa6) */}
          <div>
            <h3 className="font-['Montserrat'] text-sm font-bold uppercase tracking-widest text-[#111111] mb-6">
              Kết nối với chúng tôi
            </h3>
            <div className="flex gap-4 mb-8">
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noreferrer" 
                 className="p-3 rounded-full bg-gray-50 text-gray-600 hover:bg-[#1877F2] hover:text-white hover:-translate-y-1 transition-all duration-300">
                <FaFacebookF size={18} />
              </a>
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                 className="p-3 rounded-full bg-gray-50 text-gray-600 hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:text-white hover:-translate-y-1 transition-all duration-300">
                <FaInstagram size={18} />
              </a>
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Newsletter..." 
                className="w-full text-xs py-3 px-4 bg-gray-50 border border-gray-100 rounded-full focus:outline-none focus:border-black transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black text-white rounded-full">
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">
            © 2026 CHANSHOP.
          </p>
        </div>
      </div>
    </footer>
  );
}