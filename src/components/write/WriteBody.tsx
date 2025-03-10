import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import formClient from "../../api/form-axios";
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

  p {
    margin-top: 8px;
    color: red;
    font-size: 14px;
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

type FormData = {
  subject: string;
  content: string;
  files: FileList;
};

export default function WriteBody() {
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Form 제출
  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("subject", data.subject);
      formData.append("content", data.content);

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await formClient.post("board/write", formData);

      if (response.status === 200) {
        console.log(response.data.data);
        alert("게시글 작성 완료");
        setFiles([]);
        navigate("/board");
      } else {
        alert("게시글 작성에 실패하였습니다.");
      }
    } catch (err) {
      console.error("오류 발생:", err);
      alert("게시글 작성중 오류가 발생되었습니다.");
    }
  };

  // 취소버튼 핸들러
  const handleCancel = () => {
    if (window.confirm("게시글 작성을 취소하시겠습니까?")) {
      navigate("/board");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* 제목 입력란 */}
      <div>
        <label htmlFor="subject">제목</label>
        <input
          id="subject"
          placeholder="제목을 입력하세요"
          {...register("subject", { required: "제목은 비워둘 수 없습니다." })}
        />
        {errors.subject && <p>{errors.subject.message}</p>}
      </div>

      {/* 본문 입력란 */}
      <div>
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          placeholder="내용을 입력하세요"
          {...register("content", { required: "본문은 비워둘 수 없습니다." })}
        />
        {errors.content && <p>{errors.content.message}</p>}
      </div>

      {/* 파일 업로드 컴포넌트 */}
      <FileUpload files={files} setFiles={setFiles} />

      {/* 제출 및 취소 */}
      <ButtonContainer>
        <button type="button" className="cancel-btn" onClick={handleCancel}>
          취소
        </button>
        <button type="submit" className="submit-btn">
          작성하기
        </button>
      </ButtonContainer>
    </Form>
  );
}
