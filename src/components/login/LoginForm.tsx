import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  } = useForm<LoginFormProps>();

  const navigate = useNavigate();

  useEffect(() => {
    setFocus("id");
  }, [setFocus]);

  const onSubmit = async (data: LoginFormProps) => {
    try {
      const response = await formClient.post("auth", data);
      console.log("서버 응답:", response);

      if (response.status === 200 && response.data.message === "success") {
        navigate("/board");
      }
    } catch (error) {
      console.error("에러 발생:", error);
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
      <Button type="submit">로그인</Button>
    </Container>
  );
}
