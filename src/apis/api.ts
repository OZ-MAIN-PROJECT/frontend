import axios from "axios";

const api = axios.create({
  baseURL: "http://3.93.163.29:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청에 토큰 자동 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
