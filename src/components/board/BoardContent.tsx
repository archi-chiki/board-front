import { Link, useNavigate } from "react-router-dom";

export interface Post {
  readonly id: number;
  readonly subject: string;
  readonly author: {
    name: string;
  };
  readonly createdAt: string;
  readonly content: string;
  views?: number;
  likes?: number;
}

export interface PostContentProps {
  post: Post;
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
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
};

export default PostContent;
