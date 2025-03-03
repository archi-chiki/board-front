import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEdit } from "../../provider/EditProvider";
import apiClient from "../../api/axios-instance";
import { usePage } from "../../provider/PageProvider";
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

export default function DetailTitle() {
  // Context를 사용해서 상태를 전달받음
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

        // 배열에서 params와 일치하는 데이터를 파싱하는 부분 수정해야함..
        const result = await response.data.posts[numericPostId - 1];
        console.log(result);
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
