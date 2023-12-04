"use client";

import { sampleBoard } from "@/models/sample-board-data";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
  resetServerContext,
} from "react-beautiful-dnd";
import BoardListTitle from "./board-list-title";
import { Button } from "./ui/button";

const BoardContent = () => {
  resetServerContext();

  const [boardTasks, setBoardTasks] = useState(sampleBoard);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { reason, source, destination } = result;

    if (reason !== "DROP" || typeof destination?.index === "undefined") return;

    const sourceCardIndex = source?.index;
    const destCardIndex = destination?.index;

    setBoardTasks((prev) => {
      const cardToMove = prev?.find(
        (list) => list?.id.toString() === source?.droppableId
      )?.cards[sourceCardIndex];

      if (!cardToMove) return prev;

      const destListIndex = prev?.findIndex(
        (list) => list?.id === Number(destination?.droppableId)
      );

      if (destListIndex === -1) return prev;

      const sourceListIndex = prev?.findIndex(
        (list) => list?.id === Number(source?.droppableId)
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-3 overflow-x-auto p-3">
        {boardTasks.map((list) => (
          <div
            key={list?.id?.toString()}
            className="rounded-xl bg-[#f1f2f4] dark:bg-[#101204] w-[272px]"
          >
            <div className="flex justify-between items-start px-3 py-2 max-w-full">
              <BoardListTitle initialTitle={list.title} />
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 ml-2.5 bg-transparent hover:bg-[#091E420F] hover:dark:bg-[#A6C5E229]"
              >
                <MoreHorizontal cursor="pointer" size={16} />
              </Button>
            </div>
            <Droppable droppableId={list?.id?.toString()}>
              {(provided, snapshot) => (
                <div
                  className="flex flex-col space-y-2 px-2 pt-2 pb-3"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {list?.cards?.map((card, index) => (
                    <Draggable
                      index={index}
                      draggableId={card.id.toString()}
                      key={card.id.toString()}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            className="pl-3 dark:bg-[#22272B] pr-2 py-1 rounded-lg shadow-[0px_1px_1px_#091E4240,0px_0px_1px_#091E424F]"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <h4>{card.title}</h4>
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default BoardContent;
