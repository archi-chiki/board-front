import styled from "@emotion/styled";

const Layout = styled.div`
  display: grid;
  /*
    1. 스타일 컴포넌트에서 Props 받아서 동적으로 애니메이션 처리 ㄱㄱ 
    2. 접고 펼치고 ㄱㄱ
  */
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
