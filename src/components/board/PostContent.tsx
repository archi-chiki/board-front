import { Link, useNavigate } from "react-router-dom";
import { PostContentProps } from "../../provider/DataProvider";

export default function PostContent({ post }: PostContentProps) {
  const navigate = useNavigate();

  return (
    <tr
      onClick={(e) => {
        // 경로 추적
        navigate(`/board/${post.id}`, { state: { from: "board" } });
      }}
      style={{
        cursor: "pointer",
      }}
    >
      <td>{post.id}</td>
      <td>{post.subject}</td>
      <td>{post.author.name}</td>
      <td>{new Date(post.createdAt).toLocaleDateString()}</td>
      <td>{post.views}</td>
      <td>{post.likes}</td>
    </tr>
  );
}
