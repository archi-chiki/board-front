import styled from "@emotion/styled";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 100vh;
  width: 100vw;
  height: 100vh;
  background-color: gray;
`;

const SideBar = styled.div`
  background-color: yellowgreen;
`;

function App() {
  return (
    <Layout>
      <SideBar />
    </Layout>
  );
}

export default App;
