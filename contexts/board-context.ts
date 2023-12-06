import { sampleBoard } from "@/models/sample-board-data";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

type Board = typeof sampleBoard;

const defaultValue: {
  board: Board;
  setBoard: Dispatch<SetStateAction<Board>>;
} = {
  board: sampleBoard,
  setBoard: () => {},
};

export const BoardContentContext = createContext(defaultValue);

export const useBoard = () => {
  const context = useContext(BoardContentContext);
  if (context === undefined) {
    throw new Error(
      `useBoard must be used within a BoardContentContext.Provider`
    );
  }
  return context;
};
