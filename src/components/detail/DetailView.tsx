import { useEdit } from "../../provider/EditProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import styled from "@emotion/styled";
import apiClient from "../../api/fetch-axios";
import PolymorphicButton from "../shared/PolymorphicButton";

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

  button,
  a.edit-btn {
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

const AttachmentsContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border-top: 1px solid #ccc;

  .attachments-list {
    list-style: none;
    padding: 0;

    .attachment-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      button {
        margin-left: 10px;
        padding: 5px 10px;
        border: none;
        cursor: pointer;
      }

      .download-btn {
        background-color: #4caf50;
        color: white;
      }

      .remove-btn {
        background-color: #f44336;
        color: white;
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

  console.log(post);

  // 수정하기 버튼 액션
  const handleEditClick = () => {
    setIsEditing(true);
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

  // 파일 다운로드 핸들러
  const handleDownload = async (file: any) => {
    try {
      const url = `board/download/${file.fileName}`;

      console.log(`다운로드 핸들러 ${file.fileName}`);

      const response = await apiClient.get(url, {
        responseType: "blob",
      });

      // Blob 데이터를 기반으로 객체 URL 생성
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);

      // <a> 태그를 생성해 다운로드 트리거
      const link = document.createElement("a");
      link.href = downloadUrl;

      // 파일 이름 설정 (서버에서 Content-Disposition 헤더로 전달된 파일 이름을 사용할 수도 있음)
      link.setAttribute("download", file.originalName);

      // 링크를 DOM에 추가하고 클릭 이벤트를 발생시킨 뒤 제거
      document.body.appendChild(link);
      link.click();
      link.remove();

      // 객체 URL 해제
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("파일 다운로드 중 오류 발생:", error);
    }
  };

  return (
    <Container>
      <ButtonContainer>
        <PolymorphicButton as="a" className="edit-btn" href="https://google.com">
          집으로가기
        </PolymorphicButton>
        <PolymorphicButton className="edit-btn" onClick={handleEditClick}>
          수정하기
        </PolymorphicButton>
        <PolymorphicButton className="delete-btn" onClick={handleDeleteClick}>
          삭제하기
        </PolymorphicButton>
      </ButtonContainer>
      <Content>
        <div className="post-title">{post.subject}</div>
        <div className="post-info">
          [작성자] {post.author.name} <br />
          [작성시간] {new Date(post.createdAt).toLocaleString()}
        </div>
        <div className="post-content">{post.content}</div>
      </Content>

      {/* Attachments Section */}
      <AttachmentsContainer>
        <h3>첨부파일</h3>
        {post.files && post.files.length > 0 ? (
          <ul className="attachments-list">
            {post.files.map((file: any, index: number) => (
              <li key={index} className="attachment-item">
                <span>{file.originalName}</span>
                <PolymorphicButton className="download-btn" onClick={() => handleDownload(file)}>
                  다운로드
                </PolymorphicButton>
              </li>
            ))}
          </ul>
        ) : (
          <p>첨부된 파일이 없습니다.</p>
        )}
      </AttachmentsContainer>

      {/* Modal for Deleting Post */}
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
