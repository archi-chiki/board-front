import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEdit } from "../../provider/EditProvider";
import { usePage } from "../../provider/PageProvider";
import apiClient from "../../api/axios-instance";
import DetailEdit from "./DetailEdit";
import DetailView from "./DetailView";
import styled from "@emotion/styled";
import "../../styles/detail.css";

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default function DetailBody() {
  const [post, setPost] = useState<string>("");
  const location = useLocation();

  // 이걸로 state에서 데이터 파싱할거임
  const { postId } = useParams<{ postId: string }>();
  const numericPostId = parseInt(postId || "", 10);

  // 이전에 머물렀던 컴포넌트가 board인지 체크
  const from = location.state?.from || "Unknown";

  // 수정 모드 상태 관리
  const { isEditing } = useEdit();

  // 현재 페이지
  const { currentPage } = usePage();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiClient.get("board", {
          params: {
            page: currentPage,
          },
        });

        // 접근하고자 하는 게시글의 ID로 게시물 ID를 찾아서 상태를 업데이트
        const result = response.data.posts.find((obj: any) => obj.id === numericPostId);
        setPost(result);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchPost();
  }, []);

  if (from !== "board") {
    return <h1>잘못된 접근입니다.</h1>;
  }

  if (!post) {
    return <div>데이터가 없자나?</div>;
  }

  return (
    <Container>
      <div className="post">
        {!isEditing ? (
          <DetailView post={post} />
        ) : (
          /* 수정 모드일 때 */
          <DetailEdit post={post} setPost={setPost} />
        )}
      </div>
    </Container>
  );
}
