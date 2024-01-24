"use client";

import { BoardContentContext } from "@/contexts/board-context";
import { Card } from "@/models/Card";
import { sampleBoard } from "@/models/sample-board-data";
import { CreditCard } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import {
  DragDropContext,
  OnDragEndResponder,
  resetServerContext,
} from "react-beautiful-dnd";
import BoardList from "./board-list";
import CardDialogTitle from "./card-dialog-title";
import { Dialog, DialogContent } from "./ui/dialog";

const BoardContent = () => {
  resetServerContext();

  const [board, setBoard] = useState(sampleBoard);

  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const openCard = useCallback((card: Card) => {
    setCardModalOpen(true);
    setSelectedCard(card);
  }, []);

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
      openCard,
    }),
    [board, openCard]
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

      {/* Card Details Dialog */}

      <Dialog open={isCardModalOpen} onOpenChange={setCardModalOpen}>
        <DialogContent className="pl-3 lg:pl-6 pr-1 lg:pr-1.5 bg-popover w-full md:min-w-[700px] rounded-lg">
          {selectedCard ? (
            <div className="relative pl-12 mt-5">
              <CreditCard className="mr-2 absolute left-[0px] top-[10px]" size={16} />
              <div className="flex items-start flex-col mr-10 lg:mr-16">
                <CardDialogTitle initialTitle={selectedCard.title} />
                <p className="mt-1">
                  in list{" "}
                  <span className="underline capitalize">
                    {selectedCard?.list?.title}
                  </span>
                </p>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </BoardContentContext.Provider>
  );
};

export default BoardContent;
