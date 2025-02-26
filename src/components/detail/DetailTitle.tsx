import { useEffect, useState } from "react";
import { useData } from "../../provider/DataProvider";
import { useLoaderData, useLocation, useParams } from "react-router-dom";
import { PostContentProps } from "../board/BoardContent";

// interface Props {
//   readonly id: number;
//   readonly subject: string;
//   readonly createdAt: string;
//   readonly content: string;
//   readonly author: {
//     name: string;
//   };
// }

// interface Post {
//   post: Props[];
// }

/* 만일 Props를 사용했다면? */
// const DetailTitle = ({post}: Post) => {
//   return (
//     return (
//       <div className="post">
//         <div className="post-title">{post[0].subject}</div>
//         <div className="post-info">
//           [작성자] {post[0].author.name} <br />
//           [작성시간] {new Date(post[0].createdAt).toLocaleString()}
//         </div>
//         <div className="post-content">{post[0].content}</div>
//       </div>
//     );
//   };
//   )
// })

const DetailTitle = () => {
  // Context를 사용해서 상태를 전달받음
  const { data } = useData();
  const location = useLocation();

  // 이걸로 state에서 데이터 파싱할거임
  const { postId } = useParams<{ postId: string }>();
  const numericPostId = parseInt(postId || "", 10);
  const post = data.find((item) => item.id === numericPostId);

  // 이전에 머물렀던 컴포넌트가 board인지 체크
  const pastComponent = () => {
    const from = location.state?.from || "Unknown";
    console.log(from);
    return from;
  };

  if (pastComponent() !== "board") {
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
