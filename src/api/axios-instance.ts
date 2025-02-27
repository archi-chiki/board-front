import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: "http://localhost:9000", // API의 기본 URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // 요청 타임아웃 설정 (5초)
});

// 요청 헤더 커스텀을 위한 인터셉터
// 이렇게 하는거 맞겠죠 선생님..?
apiClient.interceptors.request.use(
  (config) => {
    config.headers["X-Key"] = "Help me teacher";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
