import { useData } from "../../provider/DataProvider";

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

  if (!data) {
    return <div>데이터가 없자나?</div>;
  }

  console.log(data);
  return (
    <div className="post">
      <div className="post-title">{data[0].subject}</div>
      <div className="post-info">
        [작성자] {data[0].author.name} <br />
        [작성시간] {new Date(data[0].createdAt).toLocaleString()}
      </div>
      <div className="post-content">{data[0].content}</div>
    </div>
  );
};

export default DetailTitle;
