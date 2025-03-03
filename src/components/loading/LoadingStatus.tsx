import styled from "@emotion/styled";
import { HashLoader } from "react-spinners";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function LoadingStatus() {
  return (
    <Container>
      <HashLoader color="black" />
    </Container>
  );
}
