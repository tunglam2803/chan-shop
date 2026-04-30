import axiosClient from './axiosClient';

const authService = {
  login: async (username, password) => {
    const url = '/Auth/login';
    const response = await axiosClient.post(url, { username, password });
    if (response && response.token) {
      localStorage.setItem('access_token', response.token);
    }
    return response;
  },

  register: async (username, phoneNumber, email, password) => {
    const url = '/Auth/register';
    const response = await axiosClient.post(url, {
      username,
      phoneNumber,
      email,
      password,
    });
    return response;
  },

  getProfile: () => {
    const url = '/Auth/profile';
    return axiosClient.get(url);
  },

  logout: () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  },
};

export default authService;