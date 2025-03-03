import { Link } from "react-router-dom";
import { useBoardFetch } from "../hooks/boardFetch";
import PostContent from "../components/board/PostContent";
import BoardHeader from "../components/board/BoardHeader";
import PagingBar from "../components/board/PagingBar";
import LoadingStatus from "../components/loading/LoadingStatus";
import "../styles/board.css";
import "../styles/common.css";

export default function BoardPage() {
  const { data, pageCount, loading, error } = useBoardFetch("board");

  if (loading === true) {
    return <LoadingStatus />;
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
          <BoardHeader />
          <tbody>
            {data.map((post: any) => (
              <PostContent key={post.id} post={post} />
            ))}
          </tbody>
        </table>
      </section>
      <PagingBar pageCount={pageCount} />
    </div>
  );
}
