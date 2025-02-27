import { useData } from "../../provider/DataProvider";
import { useLocation, useParams } from "react-router-dom";

const DetailTitle = () => {
  // Context를 사용해서 상태를 전달받음
  const { data } = useData();
  const location = useLocation();

  // 이걸로 state에서 데이터 파싱할거임
  const { postId } = useParams<{ postId: string }>();
  const numericPostId = parseInt(postId || "", 10);

  /*
    아래와 같이 state로부터 모든 데이터를 전달받아서
    id와 일치하는 게시글을 find()로 찾아내서 렌더링하는 방식도 문제가 없는지?
  */
  const post = data.find((item) => item.id === numericPostId);

  // 이전에 머물렀던 컴포넌트가 board인지 체크
  const from = location.state?.from || "Unknown";

  if (from !== "board") {
    return <h1>잘못된 접근입니다.</h1>;
  }

  if (!data || !post) {
    return <div>데이터가 없자나?</div>;
  }

  return (
    <div className="post">
      <div className="post-title">{post.subject}</div>
      <div className="post-info">
        [작성자] {post.author.name} <br />
        [작성시간] {new Date(post.createdAt).toLocaleString()}
      </div>
      <div className="post-content">{post.content}</div>
    </div>
  );
};

export default DetailTitle;
