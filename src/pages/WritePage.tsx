import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import WriteBody from "../components/write/WriteBody";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
`;

export default function CreatePost() {
  return (
    <Container>
      <h2>게시글 작성</h2>
      <WriteBody />
    </Container>
  );
}
