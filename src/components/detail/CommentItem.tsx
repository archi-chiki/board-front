import React, { useState } from "react";
import styled from "@emotion/styled";

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

export default function CommentItem({ comment, onDelete, onEdit }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleSave = () => {
    onEdit(comment.id, editedContent);
    setIsEditing(false);
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
              <Button onClick={() => onDelete(comment.id)} style={{ color: "red" }}>
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
    </CommentBox>
  );
}
