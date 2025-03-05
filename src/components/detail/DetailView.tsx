import { useEdit } from "../../provider/EditProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import styled from "@emotion/styled";
import apiClient from "../../api/axios-instance";

Modal.setAppElement("#root");

const Container = styled.div`
  position: relative;
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

    &.edit-btn {
      background-color: #2196f3; /* 수정하기 버튼 색상 */
      color: white;
    }

    &.delete-btn {
      background-color: #f44336; /* 삭제하기 버튼 색상 */
      color: white;
    }

    &:hover {
      opacity: 0.9;
    }
  }
`;

const Content = styled.div`
  margin-top: 16px;

  .post-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .post-info {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 16px;
  }

  .post-content {
    font-size: 1rem;
    line-height: 1.5;
    white-space: pre-wrap; /* 줄바꿈 유지 */
  }
`;

const ModalContainer = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    flex: 1; /* 버튼들이 동일한 너비를 가지도록 설정 */
    padding: 10px;
    font-size: 14px;
    border-radius: 4px; /* 둥근 모서리 */
    margin: 0 5px; /* 버튼 간격 조정 */
    cursor: pointer;
    border: none;
    text-align: center;
    transition: background-color 0.3s ease;

    &:first-of-type {
      background-color: #f5f5f5; /* 취소 버튼 색상 */
      color: #333;

      &:hover {
        background-color: #e0e0e0; /* Hover 효과 */
      }
    }

    &:last-of-type {
      background-color: #ff4d4f; /* 삭제 버튼 색상 */
      color: white;

      &:hover {
        background-color: #e33a3c; /* Hover 효과 */
      }
    }
  }
`;

interface Post {
  post: any;
}

export default function DetailView({ post }: Post) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setIsEditing } = useEdit();
  const navigate = useNavigate();

  // 수정하기 버튼 액션
  const handleEditClick = () => {
    setIsEditing(true); // 수정 모드 활성화
  };

  // 삭제하기 버튼 액션
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 모달에 있는 삭제버튼 액션
  const confirmDelete = async () => {
    const url = `board/delete/${post.id}`;
    try {
      const response = await apiClient.delete(url);

      console.log(response);

      setIsEditing(false);
      setIsModalOpen(false);
      navigate("/board", { state: { message: "Post deleted successfully!" } });
    } catch (error) {
      console.error("게시글 수정 중 오류가 발생됨:", error);
    }
  };

  return (
    <Container>
      <ButtonContainer>
        <button className="edit-btn" onClick={handleEditClick}>
          수정하기
        </button>
        <button className="delete-btn" onClick={handleDeleteClick}>
          삭제하기
        </button>
      </ButtonContainer>
      <Content>
        <div className="post-title">{post.subject}</div>
        <div className="post-info">
          [작성자] {post.author.name} <br />
          [작성시간] {new Date(post.createdAt).toLocaleString()}
        </div>
        <div className="post-content">{post.content}</div>
      </Content>
      <ModalContainer isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>게시글 삭제</h2>
        <p>정말로 이 게시글을 삭제하시겠습니까?</p>
        <div className="button-group">
          <button onClick={closeModal}>취소</button>
          <button onClick={confirmDelete}>삭제</button>
        </div>
      </ModalContainer>
    </Container>
  );
}
