import { apiUrl } from "../const/url";
import axios from "axios";

// Axios 인스턴스 생성
const formClient = axios.create({
  baseURL: apiUrl, // API의 기본 URL
  timeout: 5000, // 요청 타임아웃 설정 (5초)
});

export default formClient;
