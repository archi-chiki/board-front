import styled from "@emotion/styled";

const Container = styled.form`
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

export default function LoginForm() {
  return (
    <Container>
      <h2>Haaaaalo?</h2>
      <Input id="email" placeholder="Email" />
      <Input id="password" placeholder="Password" />
      <Button type="submit">로그인</Button>
    </Container>
  );
}
