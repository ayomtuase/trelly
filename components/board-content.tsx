"use client";

import { BoardContentContext } from "@/contexts/board-context";
import { sampleBoard } from "@/models/sample-board-data";
import { useMemo, useState } from "react";
import {
  DragDropContext,
  OnDragEndResponder,
  resetServerContext
} from "react-beautiful-dnd";
import BoardList from "./board-list";

const BoardContent = () => {
  resetServerContext();

  const [board, setBoard] = useState(sampleBoard);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { reason, source, destination } = result;

    if (reason !== "DROP" || typeof destination?.index === "undefined") return;

    const sourceCardIndex = source?.index;
    const destCardIndex = destination?.index;

    setBoard((prev) => {
      const cardToMove = prev?.find(
        (list) => list?.id.toString() === source?.droppableId
      )?.cards[sourceCardIndex];

      if (!cardToMove) return prev;

      const destListIndex = prev?.findIndex(
        (list) => list?.id === destination?.droppableId
      );

      if (destListIndex === -1) return prev;

      const sourceListIndex = prev?.findIndex(
        (list) => list?.id === source?.droppableId
      );

      if (sourceListIndex === destListIndex) {
        const newList = {
          ...prev?.[sourceListIndex],
          cards: prev?.[sourceListIndex]?.cards
            ?.toSpliced(sourceCardIndex, 1)
            ?.toSpliced(destCardIndex, 0, cardToMove),
        };

        const newBoard = prev?.toSpliced(sourceListIndex, 1, newList);
        return newBoard;
      }

      const newSourceList = {
        ...prev?.[sourceListIndex],
        cards: prev?.[sourceListIndex]?.cards?.toSpliced(sourceCardIndex, 1),
      };

      const newDestinationList = {
        ...prev?.[destListIndex],
        cards: prev?.[destListIndex]?.cards?.toSpliced(
          destCardIndex,
          0,
          cardToMove
        ),
      };

      let newBoard = prev?.toSpliced(sourceListIndex, 1, newSourceList);

      newBoard = newBoard?.toSpliced(destListIndex, 1, newDestinationList);

      return newBoard;
    });
  };

  const boardValue = useMemo(
    () => ({
      board,
      setBoard,
    }),
    [board]
  );

  return (
    <BoardContentContext.Provider value={boardValue}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-3 overflow-x-auto p-3">
          {board.map((list) => (
            <BoardList list={list} key={list?.id} />
          ))}
        </div>
      </DragDropContext>
    </BoardContentContext.Provider>
  );
};

export default BoardContent;
