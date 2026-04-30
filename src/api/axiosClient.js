import axios from 'axios';

// 1. Khởi tạo instance với cấu hình cơ bản
const axiosClient = axios.create({
  // URL Tailscale mới của bạn
  baseURL: 'http://100.82.245.4:5083/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor cho Request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    
    // Log để kiểm tra trong tab Console của trình duyệt
    console.log("🚀 Interceptor đang gửi Token:", token); 
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Interceptor cho Response
axiosClient.interceptors.response.use(
  (response) => {
    // Trả về data trực tiếp
    return response.data;
  },
  (error) => {
    // Xử lý lỗi 401 (Hết hạn token)
    if (error.response && error.response.status === 401) {
      console.error("Phiên đăng nhập hết hạn!");
      localStorage.removeItem('access_token');
      // window.location.href = '/login'; // Bỏ comment nếu muốn tự động quay về login
    }
    return Promise.reject(error);
  }
);

export default axiosClient;