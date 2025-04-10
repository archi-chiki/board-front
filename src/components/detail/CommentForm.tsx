// import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import apiClient from "../../api/fetch-axios";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const StyledTextarea = styled.textarea`
  width: 97%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  min-height: 60px;
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  font-size: 14px;
  color: white;
  background-color: #0073e6;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #005bb5;
  }
`;

export default function CommentForm({ postId, onAddComment }: any) {
  // const [content, setContent] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ content: string }>();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!content.trim()) return;
  const onSubmit = async (data: { content: string }) => {
    if (!data.content.trim()) return;

    try {
      const response = await apiClient.post(`board/${postId}/comments`, { content: data.content });

      if (response.status === 200) {
        onAddComment();
        // setContent("");
        reset();
      }
    } catch (error) {
      console.error("댓글 추가 중 오류 발생:", error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <StyledTextarea
        // value={content}
        // onChange={(e) => setContent(e.target.value)}
        {...register("content", { required: "댓글 본문은 비어있을 수 없습니다." })}
        placeholder="댓글을 입력하세요..."
      />
      {errors.content && <p style={{ color: "red", fontSize: "12px" }}>{errors.content.message}</p>}
      <SubmitButton type="submit">댓글 작성</SubmitButton>
    </FormContainer>
  );
}
