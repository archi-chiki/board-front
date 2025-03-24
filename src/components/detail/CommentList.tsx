import { useEffect, useState } from "react";
import apiClient from "../../api/fetch-axios";
import styled from "@emotion/styled";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

const NoCommentMessage = styled.p`
  text-align: center;
  font-size: 14px;
  color: #888;
`;

export default function CommentList({ postId }: any) {
  const [comments, setComments] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`board/${postId}/comments`);
      setComments(response.data);
      return response;
    } catch (error) {
      console.error("댓글 데이터 패치중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    fetchComments();
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      const response = await apiClient.delete(`board/comments/${commentId}`);
      if (response.data.status === "success") {
        alert("댓글 삭제가 완료되었습니다!");
        fetchComments();
      }
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
    }
  };

  const handleEditComment = async (commentId: number, newContent: string) => {
    try {
      await apiClient.put(`board/comments/${commentId}`, {
        commentId: commentId,
        content: newContent,
      });
      console.log(newContent);
      setComments((prev: any) =>
        prev.map((comment: any) =>
          comment.id === commentId ? { ...comment, content: newContent } : comment,
        ),
      );
    } catch (error) {
      console.error("댓글 수정 중 오류 발생:", error);
    }
  };

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
