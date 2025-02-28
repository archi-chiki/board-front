import { ClimbingBoxLoader } from "react-spinners";
import PostContent from "../components/board/BoardContent";

export default function TestLoading(props: any) {
  if (props.loading) {
    return (
      <tr>
        <td
          colSpan={5}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ClimbingBoxLoader color="black" />
        </td>
      </tr>
    );
  }
  return (
    <>
      {props.data.map((post: any) => (
        <PostContent key={post.id} post={post} />
      ))}
    </>
  );
}
