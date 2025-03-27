import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import formClient from "../../api/form-axios";

const Container = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 360px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #303f9f;
  }
`;

interface LoginFormProps {
  id: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<LoginFormProps>(); // 여기에 Yup 또는 유효성 검사 가능한 라이브러리를 통해 유효성 검사를 하는 로직추가

  const navigate = useNavigate();

  useEffect(() => {
    setFocus("id");
  }, [setFocus]);

  const onSubmit = async (data: LoginFormProps) => {
    try {
      const response = await formClient.post("auth", data);
      console.log("서버 응답:", response);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/board");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Axios Error: ", error.message);
        if (error.response) {
          const status = error.response.status;
          if (status === 400) {
            toast.error("아이디가 존재하지 않습니다.");
          } else if (status === 401) {
            toast.error("비밀번호가 잘못되었습니다.");
          } else {
            toast.error("로그인 중 오류가 발생되었습니다.");
          }
        }
      } else {
        console.error("알 수 없는 에러: ", error);
      }
    }
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <h2>로그인 해주세요 제발</h2>
      <Input id="id" placeholder="ID" {...register("id", { required: true })} />
      <Input
        id="password"
        placeholder="Password"
        type="password"
        {...register("password", { required: true })}
      />
      {errors["password"] && <span>{errors["password"].message}</span>}
      <Button type="submit">로그인</Button>
    </Container>
  );
}
