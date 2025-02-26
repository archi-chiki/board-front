import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useContext,
} from "react";
import { Post } from "../components/board/BoardContent";

// BoardContext의 타입 정의
interface BoardContextValue {
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
}

// 초기값 설정
const BoardContext = createContext<BoardContextValue | undefined>(undefined);

export const BoardProvider = ({ children }: PropsWithChildren) => {
  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);

  return <BoardContext.Provider value={{ posts, setPosts }}>{children}</BoardContext.Provider>;
};

export const useBoard = () => {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error("Board Provider의 자식이 아님");
  }

  return context;
};
