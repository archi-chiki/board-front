import React from "react";
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

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    text-decoration: underline;
  }
`;

export default function CommentItem({ comment, onDelete }: any) {
  return (
    <CommentBox>
      <CommentHeader>
        <Author>{comment.author.name}</Author>
        <DeleteButton onClick={() => onDelete(comment.id)}>삭제</DeleteButton>
      </CommentHeader>
      <CommentContent>{comment.content}</CommentContent>
      <CommentDate>{new Date(comment.createdAt).toLocaleString()}</CommentDate>
    </CommentBox>
  );
}
