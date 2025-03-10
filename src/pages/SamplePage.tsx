import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/fetch-axios";
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
const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const FileLabel = styled.label`
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const HiddenInput = styled.input`
  display: none; /* 숨김 처리 */
`;

const FileListContainer = styled.div`
  margin-top: 20px;
`;

const FileListTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const FileList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FileItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;

  &:hover {
    background-color: #f1f1f1;
    transition: background-color 0.2s ease-in-out;
  }
`;

const FileName = styled.span`
  font-weight: bold;
`;

const FileSize = styled.span`
  color: #666;
`;

export default function WriteBody() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  // 게시글 작성 및 파일 업로드 요청
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
        alert("게시글과 파일이 성공적으로 업로드되었습니다!");
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

  // 파일 업로드 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]); // 기존 파일에 새로 추가
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
      <FileUploadContainer>
        <FileLabel htmlFor="file">
          파일 업로드
          <HiddenInput id="file" type="file" multiple onChange={handleFileChange} />
        </FileLabel>
        {files.length > 0 && (
          <FileListContainer>
            <FileListTitle>선택된 파일</FileListTitle>
            <FileList>
              {files.map((file, index) => (
                <FileItem key={index}>
                  <FileName>{file.name}</FileName>
                  <FileSize>({(file.size / (1024 * 1024)).toFixed(2)} MB)</FileSize>
                </FileItem>
              ))}
            </FileList>
          </FileListContainer>
        )}
      </FileUploadContainer>
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
