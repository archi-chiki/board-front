import styled from "@emotion/styled";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
import PageBar from "../board/PagingBar";

const Container = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

interface Props {
  children?: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <Container>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      {/* <PageBar /> */}
      <Footer />
    </Container>
  );
};
