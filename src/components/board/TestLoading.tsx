import { useData } from "../../provider/DataProvider";
import PostContent from "./PostContent";

export default function TestLoading() {
  const { data } = useData();

  return (
    <>
      {data.map((post: any) => (
        <PostContent key={post.id} post={post} />
      ))}
    </>
  );
}
