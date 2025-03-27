import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import Layout from "./components/common/Layout";
import MainPage from "./pages/MainPage";
import BoardPage from "./pages/BoardPage";
import WritePage from "./pages/WritePage";
import DetailPage from "./pages/DetailPage";
import VideoPage from "./pages/VideoPage";
import StorePage from "./pages/StorePage";
import LoginPage from "./pages/LoginPage";
import Sample from "./pages/SamplePage";
import useAuthCheck from "./hooks/useAuthCheck";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const { isAuth } = useAuthCheck();

  return (
    <>
      <Routes>
        {/* Layout을 부모 라우트로 설정 */}
        <Route path="/" element={<Layout />}>
          {/* 자식 라우트 정의 */}
          <Route index element={isAuth ? <Navigate to="/board" replace /> : <LoginPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="board/:postId" element={<DetailPage />} />
          <Route path="board/write" element={<WritePage />} />
          <Route path="board" element={<BoardPage />} />
          <Route path="video" element={<VideoPage />} />
          <Route path="store" element={<StorePage />} />
          <Route path="train" element={<Sample />} />
        </Route>

        {/* 404 Not Found 페이지 (Layout 외부) */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <h1>404</h1>
              <p>NOT FOUND</p>
            </div>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
