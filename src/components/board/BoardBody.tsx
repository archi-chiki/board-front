import { useNavigate } from "react-router-dom";
import { Post, useData } from "../../provider/DataProvider";
import { usePage } from "../../provider/PageProvider";

export default function BoardBody() {
  const { data } = useData();
  const { currentPage } = usePage();
  const navigate = useNavigate();

  return (
    <tbody>
      {data.map((post: Post, index: number) => {
        const postID = (currentPage - 1) * 10 + (index + 1);
        // console.log(postID);

        return (
          <tr
            key={post.id}
            onClick={(e) => {
              // 경로 추적
              navigate(`/board/${post.id}`);
            }}
            style={{
              cursor: "pointer",
            }}
          >
            <td>{postID}</td>
            <td>{post.subject}</td>
            <td>{post.author.name}</td>
            <td>{new Date(post.createdAt).toLocaleDateString()}</td>
            <td>{post.views}</td>
            <td>{post.likes}</td>
          </tr>
        );
      })}
    </tbody>
  );
}
