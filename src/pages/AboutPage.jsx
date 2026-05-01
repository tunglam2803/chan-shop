import Header from "../components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] font-['Roboto']">
      <Header />
      
      <main className="max-w-4xl mx-auto py-24 px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="font-['Montserrat'] text-[36px] font-bold uppercase tracking-tight text-[#111111] mb-4">
            About Us
          </h1>
          <p className="text-lg text-[#555] max-w-2xl mx-auto">
            Welcome to ChanShop, where minimal design meets maximum style. We believe in the power of simplicity, quality, and timeless fashion.
          </p>
        </div>

        {/* Brand Image */}
        <div className="mb-16 rounded-xl overflow-hidden shadow-sm">
          <img 
            src="/aboutus.jpg"
            alt="ChanShop Brand Identity" 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <section className="space-y-8 text-[#555] leading-relaxed">
          
          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-['Montserrat'] text-[24px] font-bold uppercase tracking-tight text-[#111111] mb-6">
                Our Story
              </h2>
              <div className="space-y-4">
                <p>
                  Câu chuyện của ChanShop bắt đầu từ một góc nhìn đầy trăn trở của nhà sáng lập <strong>Tú Sena</strong> giữa nhịp sống hối hả của năm 2026. Nhận thấy tủ quần áo của mọi người ngày càng trở nên chật chội bởi những xu hướng "sớm nở tối tàn", Tú Sena đã tự đặt ra một câu hỏi: <em>"How can we dress better and more elegantly, while requiring fewer cluttered choices?"</em>
                </p>
                <p>
                  Từ niềm đam mê mãnh liệt với phong cách sống tối giản, Tú Sena tin rằng thời trang không chỉ là lớp áo khoác lên người, mà là cách chúng ta thể hiện bản thân chân thật nhất. Sự thanh lịch thực sự không đến từ những chi tiết cầu kỳ, mà bắt nguồn từ những đường cắt may hoàn hảo và thiết kế vượt thời gian. Đó chính là lý do <strong>ChanShop</strong> chính thức ra đời.
                </p>
              </div>
            </div>
            
            {/* Founder Portrait */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src="/founder.jpg" 
                  alt="Founder Tú Sena" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 shadow-lg rounded">
                <p className="font-['Montserrat'] font-bold text-[#111111] text-lg">Tú Sena</p>
                <p className="text-sm text-gray-500">Founder & Creative Director</p>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="bg-gray-50 p-8 rounded-lg mt-12 mb-16 border-l-4 border-[#111111]">
            <p className="text-lg italic text-[#333]">
              "Dưới sự dẫn dắt của Tú Sena, ChanShop không chỉ là một cửa hàng thời trang, mà là một không gian truyền cảm hứng cho lối sống tinh gọn. Chúng tôi mong muốn mỗi khách hàng khi khoác lên mình trang phục của ChanShop đều cảm nhận được sự tự tin, thoải mái và tìm thấy phiên bản hoàn hảo nhất của chính mình."
            </p>
          </div>

          {/* Values Section */}
          <div>
            <h2 className="font-['Montserrat'] text-[24px] font-bold uppercase tracking-tight text-[#111111] mb-6">
              Our Core Values
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-[#111111] font-bold text-lg mb-2">Quality</h3>
                <p>Chúng tôi ưu tiên chất lượng vượt trội hơn là số lượng sản phẩm mờ nhạt.</p>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-[#111111] font-bold text-lg mb-2">Sustainability</h3>
                <p>Cam kết sử dụng nguồn nguyên liệu có trách nhiệm và quy trình sản xuất đạo đức.</p>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-[#111111] font-bold text-lg mb-2">Minimalism</h3>
                <p>Less is more — thiết kế tinh gọn, sạch sẽ nhưng luôn mang theo chủ đích rõ ràng.</p>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-[#111111] font-bold text-lg mb-2">Customer Focus</h3>
                <p>Sự hài lòng và trải nghiệm tự tin của bạn chính là thước đo thành công của ChanShop.</p>
              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}