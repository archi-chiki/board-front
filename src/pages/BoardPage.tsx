import { Link } from "react-router-dom";
import PostContent from "../components/board/BoardContent";
import "../styles/board.css";
import "../styles/common.css";
import { useBoradFetch } from "../hooks/boardFetch";
import { ClimbingBoxLoader } from "react-spinners";
import TestLoading from "./TestLoading";

const BoardPage = () => {
  // 로딩, 에러 상태도 커스텀 훅에서 일괄적으로 관리하는게 바람직한지..?
  const { data, loading, error } = useBoradFetch("board");

  // if (loading === true) {
  //   console.log("로딩 State가 렌더링 됨");
  //   return (
  // <div
  //   style={{
  //     width: "100%",
  //     height: "100%",
  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "center",
  //   }}
  // >
  //   <ClimbingBoxLoader color="black" />
  // </div>
  //   );
  // }

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
            {/* {data.map((post) => (
              <PostContent key={post.id} post={post} />
            ))} */}

            <TestLoading data={data} loading={loading} />
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default BoardPage;
