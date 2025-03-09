import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "./FileUpload";
import apiClient from "../../api/axios-instance";
import styled from "@emotion/styled";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  label {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 8px;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:focus {
      outline: none;
      border-color: #2196f3; /* 포커스 시 색상 */
      box-shadow: 0px 0px 4px rgba(33, 150, 243, 0.5);
    }
  }

  textarea {
    resize: vertical; /* 세로 크기만 조정 가능 */
    min-height: 150px;
    line-height: 1.5;
    white-space: pre-wrap; /* 줄바꿈 유지 */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  button {
    padding: 10px 16px;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    border: none;

    &.cancel-btn {
      background-color: #f5f5f5; /* 취소 버튼 색상 */
      color: #333;

      &:hover {
        background-color: #e0e0e0; /* Hover 효과 */
      }
    }

    &.submit-btn {
      background-color: #4caf50; /* 제출 버튼 색상 */
      color: white;

      &:hover {
        background-color: #45a049; /* Hover 효과 */
      }
    }
  }
`;

export default function WriteBody() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  // 게시글 작성 요청
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("content", content);

      console.log(subject, content, files);

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await apiClient.post("board/write", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        console.log(response.data.data.files);
        alert("게시글 작성 성공");
        setFiles([]);
        navigate("/board");
      } else {
        alert("업로드에 실패했습니다.");
      }
    } catch (error) {
      console.error("업로드 중 오류 발생:", error);
      alert("업로드 중 오류가 발생했습니다.");
    }
  };

  // 취소 버튼
  const handleCancel = () => {
    if (window.confirm("게시글 작성을 취소하시겠습니까?")) {
      navigate("/board");
    }
  };

  return (
    <Form>
      <div>
        <label htmlFor="subject">제목</label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="제목을 입력하세요"
        />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
        />
      </div>

      {/* 파일 업로드 컴포넌트 */}
      <FileUpload files={files} setFiles={setFiles} />

      <ButtonContainer>
        <button type="button" className="cancel-btn" onClick={handleCancel}>
          취소
        </button>
        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          작성하기
        </button>
      </ButtonContainer>
    </Form>
  );
}
