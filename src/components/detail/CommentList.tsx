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
  const [comments, setComments] = useState<any | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiClient.get(`board/${postId}/comments`);
        console.log(JSON.stringify(response.data));
        setComments(response.data);
      } catch (error) {
        console.error("댓글을 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = (newComment: any) => {
    setComments((prev: any) => [newComment, ...prev]);
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await apiClient.delete(`board/comments/${commentId}`);
      setComments((prev: any) => prev.filter((comment: any) => comment.id !== commentId));
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
    }
  };

  if (loading) return <p>댓글을 불러오는 중...</p>;

  return (
    <div>
      <h3>댓글 ({comments.length})</h3>
      <CommentForm postId={postId} onAddComment={handleAddComment} />
      {comments.length > 0 ? (
        comments.map((comment: any) => (
          <CommentItem key={comment.id} comment={comment} onDelete={handleDeleteComment} />
        ))
      ) : (
        <NoCommentMessage>댓글이 존재하지 않습니다.</NoCommentMessage>
      )}
    </div>
  );
}
