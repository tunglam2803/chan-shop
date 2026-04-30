import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    /* Container chính chứa Background */
    <div 
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center p-4 font-['Roboto'] relative"
      style={{
        backgroundImage: "url('/backgr.jpg')", 
      }}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[3px]"></div>

      {/* Card Đăng nhập - Phong cách Paper Design */}
      <div className="relative z-10 w-full max-w-[340px] bg-white border border-[#E5E5E5] p-8 shadow-xl">
        <header className="mb-8 text-center">
          <h1 className="font-['Montserrat'] text-2xl font-bold tracking-tight text-[#111111] uppercase">
            Sign In
          </h1>
          <div className="h-1 w-12 bg-[#111111] mx-auto mt-2"></div>
        </header>

        <form className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1 ml-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 text-sm border border-[#D1D5DB] focus:border-[#111111] focus:ring-0 outline-none transition-colors placeholder:text-gray-300"
              placeholder="name@company.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1 ml-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 text-sm border border-[#D1D5DB] focus:border-[#111111] focus:ring-0 outline-none transition-colors placeholder:text-gray-300"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#111111] hover:bg-[#333333] text-white text-xs font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-sm"
          >
            Authenticate
          </button>
        </form>

        <footer className="mt-8 pt-6 border-t border-[#F3F4F6] text-center">
          <a href="#" className="text-[11px] text-[#9CA3AF] hover:text-[#111111] transition-colors uppercase tracking-tighter">
            Forgot Password?
          </a>
          <Link to="/register" className="text-[11px] text-[#9CA3AF] hover:text-[#111111] transition-colors uppercase tracking-tighter ml-4">
            Create an account
          </Link>
        </footer>
      </div>
    </div>
  );
}