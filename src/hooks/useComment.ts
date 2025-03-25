import { useState } from "react";
import apiClient from "../api/fetch-axios";

export function useComment(postId: number) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`board/${postId}/comments`);
      setComments(response.data);
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
      console.log(response);
      if (response.status === 200) {
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
        commentId,
        content: newContent,
      });
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? { ...comment, content: newContent } : comment,
        ),
      );
    } catch (error) {
      console.error("댓글 수정 중 오류 발생:", error);
    }
  };

  return {
    comments,
    loading,
    fetchComments,
    handleAddComment,
    handleDeleteComment,
    handleEditComment,
  };
}
