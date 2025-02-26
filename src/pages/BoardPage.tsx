import { Link } from "react-router-dom";
import PostContent from "../components/board/BoardContent";
import "../styles/board.css";
import "../styles/common.css";
import { useEffect, useState } from "react";
import { useData } from "../provider/DataProvider";
import apiClient from "../utils/axios-instance";

const BoardPage = () => {
  // TODO: Context API
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { data, setData } = useData(); // 얘는 왜 객체로만 선언되지?

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await apiClient.get("/board");

        // 데이터 확인
        console.log(response);
        setData(response.data);
      } catch (error) {
        if (error) {
          setError(true);
        } else {
          throw error;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading === true) {
    console.log("로딩 State가 랜더링 됨");
    return <div>데이터 로딩중...</div>;
  }

  if (error === true) {
    return <div>데이터 로딩중 문제가 발생되었음...</div>;
  }

  return (
    <div>
      <section className="board-content">
        <div className="board-header">
          <h2>게시판</h2>
          <Link to={"/board/write"}>
            <button className="function-btn write">글쓰기</button>
          </Link>
        </div>

        <table className="board-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
              <th>조회수</th>
              <th>추천수</th>
            </tr>
          </thead>
          <tbody>
            {data.map((post) => (
              <PostContent key={post.id} post={post} />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default BoardPage;
