import { Link } from "react-router-dom";
import PostContent from "../components/board/BoardContent";
import "../styles/board.css";
import "../styles/common.css";
import { useEffect, useState } from "react";

interface Props {
  id: number;
  subject: string;
  createdAt: string;
  content: string;
  author: {
    name: string;
  };
}

const BoardPage = () => {
  // TODO: Context API
  const [posts, setPosts] = useState<ReadonlyArray<Props>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:9000/board", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("실패" + response.status);
      }

      const resData = await response.json();
      setPosts(resData);
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

  useEffect(() => {
    fetchData();
  }, []);

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
            {posts.map((post) => (
              // <PostContent key={post} post={post} />
              <PostContent key={post.id} post={post} />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default BoardPage;
