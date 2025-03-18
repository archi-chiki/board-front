import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
`;

const Bar = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
  height: 100%;
`;

export const Footer = () => {
  return (
    <Container>
      <Bar>© {new Date().getFullYear()} All rights reserved</Bar>
    </Container>
  );
};
