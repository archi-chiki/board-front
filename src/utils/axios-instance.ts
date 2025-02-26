import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: "http://localhost:9000", // API의 기본 URL
  headers: {
    "Content-Type": "application/json", // 기본 헤더 설정
  },
  timeout: 5000, // 요청 타임아웃 설정 (5초)
});

export default apiClient;
