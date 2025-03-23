import React, { useState } from "react";
import styled from "@emotion/styled";
import Modal from "react-modal";
import PolymorphicButton from "../shared/PolymorphicButton";

const CommentBox = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Author = styled.span`
  font-weight: bold;
  color: #0073e6;
`;

const CommentContent = styled.p`
  margin-top: 5px;
  font-size: 14px;
  color: #333;
`;

const CommentDate = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #888;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 5px;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    text-decoration: underline;
  }
`;

const Input = styled.textarea`
  width: 100%;
  margin-top: 5px;
  font-size: 14px;
  color: #333;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

export default function CommentItem({ comment, onDelete, onEdit }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleSave = () => {
    onEdit(comment.id, editedContent);
    setIsEditing(false);
  };

  const confirmDelete = async () => {
    await onDelete(comment.id);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <CommentBox>
      <CommentHeader>
        <Author>{comment.author.name}</Author>
        <ButtonGroup>
          {isEditing ? (
            <>
              <Button onClick={handleSave} style={{ color: "green" }}>
                저장
              </Button>
              <Button onClick={() => setIsEditing(false)}>취소</Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(true)}>수정</Button>
              <Button onClick={() => setIsModalOpen(true)} style={{ color: "red" }}>
                삭제
              </Button>
            </>
          )}
        </ButtonGroup>
      </CommentHeader>
      {isEditing ? (
        <Input value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
      ) : (
        <CommentContent>{comment.content}</CommentContent>
      )}
      <CommentDate>{new Date(comment.createdAt).toLocaleString()}</CommentDate>

      <ModalContainer isOpen={isModalOpen}>
        <h4>댓글을 삭제하시겠습니까?</h4>
        <div className="button-group">
          <PolymorphicButton className="edit-btn" onClick={closeModal}>
            취소
          </PolymorphicButton>
          <PolymorphicButton className="delete-btn" onClick={confirmDelete}>
            삭제
          </PolymorphicButton>
        </div>
      </ModalContainer>
    </CommentBox>
  );
}
