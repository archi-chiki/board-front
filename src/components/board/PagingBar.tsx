import { useData } from "../../provider/DataProvider";
import { usePage } from "../../provider/PageProvider";
import { useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`;

const PageButton = styled.button`
  padding: 6px 10px;
  font-size: 0.875rem;
  border: 1px solid #0070f3;
  border-radius: 6px;
  background-color: white;
  color: #0070f3;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background-color: #0070f3;
    color: white;
    transform: scale(1.03);
  }

  &:disabled {
    background-color: #f8f8f8;
    color: #b0b0b0;
    border-color: #e0e0e0;
    cursor: not-allowed;
    transform: none;
  }
`;

interface PageCount {
  pageCount: number;
}

export default function PagingBar({ pageCount }: PageCount) {
  const { currentPage, setCurrentPage } = usePage();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  const pageHandler = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  if (page !== null) {
    const pageNum = parseInt(page, 10);
    if (!isNaN(pageNum)) {
      setCurrentPage(pageNum);
    }
  }

  return (
    <Container>
      {/* 이전 페이지 버튼 */}
      <PageButton onClick={() => pageHandler(currentPage - 1)} disabled={currentPage === 1}>
        이전
      </PageButton>
      {Array.from({ length: pageCount }, (_, index) => (
        /* 페이지 번호 버튼 */
        <PageButton
          key={index}
          onClick={() => pageHandler(index + 1)}
          disabled={currentPage === index + 1} // 현재 페이지는 비활성화
        >
          {index + 1}
        </PageButton>
      ))}
      {/* 다음 페이지 버튼 */}
      <PageButton onClick={() => pageHandler(currentPage + 1)} disabled={currentPage === pageCount}>
        다음
      </PageButton>
    </Container>
  );
}
