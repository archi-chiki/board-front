import { useState } from "react";
import { useEdit } from "../../provider/EditProvider";
import apiClient from "../../api/axios-instance";
import styled from "@emotion/styled";

const Container = styled.div`
  position: relative;
  padding-top: 20px; /* 버튼 영역만큼의 공간 확보 */
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 8px;

  button {
    padding: 8px 12px;
    font-size: 0.9rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:first-of-type {
      background-color: #4caf50; /* 저장하기 버튼 색상 */
      color: white;
    }

    &:last-of-type {
      background-color: #f44336; /* 취소하기 버튼 색상 */
      color: white;
    }

    &:hover {
      opacity: 0.9;
    }
  }
`;

const Content = styled.div`
  margin-top: 16px; /* 본문 내용과 버튼 간의 추가 간격 */
`;

interface Post {
  post: any;
  setPost: React.Dispatch<React.SetStateAction<string>>;
}

export default function DetailEdit({ post, setPost }: Post) {
  const { setIsEditing } = useEdit();

  const [editedPost, setEditedPost] = useState({
    id: post?.id || "",
    name: post?.author.name || "",
    createdAt: post?.createdAt || "",
    subject: post?.subject || "",
    content: post?.content || "",
  });

  const handleSaveClick = async () => {
    const url = `board/edit/${editedPost.id}`;
    const requestData = {
      id: editedPost.id,
      name: post?.author.name || "",
      createdAt: post?.createdAt || "",
      subject: editedPost.subject,
      content: editedPost.content,
    };

    try {
      const response = await apiClient.post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(requestData);
      console.log("서버 응답 데이터:", response.data);

      // 부모 상태 업데이트
      setPost(response.data);

      setIsEditing(false);
    } catch (error) {
      console.error("게시글 수정 중 오류가 발생됨:", error);
    }
  };

  const handleCancelClick = () => {
    setEditedPost({
      id: post?.id || "",
      name: post?.author.name || "",
      createdAt: post?.createdAt || "",
      subject: post?.subject || "",
      content: post?.content || "",
    });
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container>
      <ButtonContainer>
        <button onClick={handleSaveClick}>저장하기</button>
        <button onClick={handleCancelClick}>취소하기</button>
      </ButtonContainer>
      <Content>
        <div className="post-title">
          <input
            type="text"
            name="subject"
            value={editedPost.subject}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", fontSize: "1rem" }}
          />
        </div>
        <div className="post-info">
          [작성자] {post.author.name} <br />
          [작성시간] {new Date(post.createdAt).toLocaleString()}
        </div>
        <div className="post-content">
          <textarea
            name="content"
            value={editedPost.content}
            onChange={handleInputChange}
            style={{ width: "100%", height: "150px", padding: "8px", fontSize: "1rem" }}
          />
        </div>
      </Content>
    </Container>
  );
}
