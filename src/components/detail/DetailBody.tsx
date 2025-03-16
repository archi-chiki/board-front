import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEdit } from "../../provider/EditProvider";
import LoadingStatus from "../loading/LoadingStatus";
import apiClient from "../../api/fetch-axios";
import DetailEdit from "./DetailEdit";
import DetailView from "./DetailView";
import styled from "@emotion/styled";
import "../../styles/detail.css";
import CommentList from "./CommentList";

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 80vh; /* 화면 높이의 80%까지만 사용 */
  overflow-y: auto; /* 세로 스크롤 활성화 */
`;

export default function DetailBody() {
  const [post, setPost] = useState<any>(null);
  const [error] = useState<boolean>(false);

  // 이걸로 state에서 데이터 파싱할거임
  const { postId } = useParams<{ postId: string }>();

  // 수정 모드 상태 관리
  const { isEditing } = useEdit();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiClient.get(`board/${postId}`);
        console.log(response.data);

        // 접근하고자 하는 게시글의 ID로 게시물 ID를 찾아서 상태를 업데이트
        setPost(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchPost();
  }, [postId]);

  if (!post) {
    return <LoadingStatus />;
  }

  if (error) {
    return <div>데이터 로딩 중 문제가 발생되었습니다.</div>;
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
      <CommentList postId={postId} />
    </Container>
  );
}
