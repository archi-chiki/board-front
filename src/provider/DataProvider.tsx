import { Post } from "../components/board/BoardContent";
import React, {
  createContext,
  useState,
  SetStateAction,
  useContext,
  Dispatch,
  PropsWithChildren,
} from "react";

interface DataContextValue {
  readonly data: Post[];
  setData: Dispatch<SetStateAction<Post[]>>;
}

// 초기값 설정(이게 맞는건지..?)
// const DataContext = createContext<DataContextValue>({ data: [] });

// 초기값 설정(아니면 이게 맞는건지..?)
const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<Post[]>([]);

  return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>;
};

// Context를 사용하는 커스텀 훅
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData는 반드시 DataProvider 내부에서 사용해야 합니다.");
  }
  return context;
};
