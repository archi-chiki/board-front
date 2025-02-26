import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 200px;
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

// import styled from "@emotion/styled";

// const Container = styled.div`
//   background-color: #333;
//   color: white;
//   text-align: center;
//   padding: 0.8rem;
//   /* position: fixed; */
//   bottom: 0;
//   width: 100vw;
// `;

// export const Footer = () => {
//   return <Container>© All rights reserved.</Container>;
// };
