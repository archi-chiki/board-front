// import { useEffect, useState } from "react";
// import apiClient from "../../api/fetch-axios";
import { useEffect } from "react";
import { useComment } from "../../hooks/useComment";
import styled from "@emotion/styled";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

const NoCommentMessage = styled.p`
  text-align: center;
  font-size: 14px;
  color: #888;
`;

export default function CommentList({ postId }: any) {
  const {
    comments,
    loading,
    fetchComments,
    handleAddComment,
    handleDeleteComment,
    handleEditComment,
  } = useComment(postId);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  if (loading) return <p>댓글을 불러오는 중...</p>;

  return (
    <div>
      <h3>댓글 ({comments.length})</h3>
      <CommentForm postId={postId} onAddComment={handleAddComment} />
      {comments.length > 0 ? (
        comments.map((comment: any) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={handleDeleteComment}
            onEdit={handleEditComment}
          />
        ))
      ) : (
        <NoCommentMessage>댓글이 존재하지 않습니다.</NoCommentMessage>
      )}
    </div>
  );
}
