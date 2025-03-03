import { createContext, useState, useContext, PropsWithChildren } from "react";

// 게시글 데이터 타입 정의
interface PageInfoValue {
  readonly currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PageContext = createContext<PageInfoValue | undefined>(undefined);

export const PageProvider = ({ children }: PropsWithChildren) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>{children}</PageContext.Provider>
  );
};

export const usePage = () => {
  const context = useContext(PageContext);

  if (!context) {
    throw new Error("useContext는 반드시 PageProvider 내부에서 사용해야 합니다.");
  }

  return context;
};
