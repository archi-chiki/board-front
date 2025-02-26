import { create } from "domain";
import React, { createContext, useState, useEffect, useContext, PropsWithChildren } from "react";

interface DataItem {
  readonly id: number;
  readonly subject: string;
  readonly createdAt: string;
  readonly content: string;
  readonly author: {
    name: string;
  };
}

interface DataContextValue {
  readonly data: DataItem[];
  // readonly loading: boolean;
  // readonly error: boolean;
  // readonly setLoading: (value: boolean) => void;
  // readonly setError: (value: boolean) => void;
}

// 초기값 설정(이게 맞는건지..?)
// const DataContext = createContext<DataContextValue>({ data: [] });

// 초기값 설정(아니면 이게 맞는건지..?)
const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:9000/board");
      if (!response.ok) {
        throw new Error("데이터 요청 실패");
      }
      const result: DataItem[] = await response.json();
      setData(result);
    } catch (err: any) {
      console.log(err);
    } finally {
      console.log("끄읏..");
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchData();
  }, []);

  return <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>;
};

// Context를 사용하는 커스텀 훅
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData는 반드시 DataProvider 내부에서 사용해야 합니다.");
  }
  return context;
};
