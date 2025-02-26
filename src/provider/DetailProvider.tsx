import { createContext } from "vm";

// types/BoardTypes.ts
export interface BoardItem {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

export interface BoardContextType {
  boards: BoardItem[]; // 게시판 항목 리스트
  addBoard: (board: Omit<BoardItem, "id" | "createdAt">) => void; // 새 게시글 추가
  updateBoard: (id: number, updatedBoard: Partial<Omit<BoardItem, "id" | "createdAt">>) => void; // 게시글 수정
}

const defaultValue: BoardContextType = {
  boards: [],
  addBoard: () => {},
  updateBoard: () => {},
};

export const BoardContext = createContext(defaultValue);
