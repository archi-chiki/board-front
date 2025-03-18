import styled from "@emotion/styled";
import Sidebar from "./Sidebar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

const Container = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export default function Layout() {
  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </Container>
  );
}
