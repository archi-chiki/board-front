import { Link, useNavigate } from "react-router-dom";

export interface Post {
  readonly id: number;
  readonly subject: string;
  readonly author: {
    name: string;
  };
  readonly createdAt: string;
  views?: number;
  likes?: number;
}

interface PostContentProps {
  post: Post;
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <tr
      onClick={(e) => {
        navigate(`/board/${post.id}`);
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
