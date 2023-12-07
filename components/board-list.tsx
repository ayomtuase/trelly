"use client";

import { sampleBoard } from "@/models/sample-board-data";
import { MoreHorizontal, Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import BoardListTitle from "./board-list-title";
import { Button } from "./ui/button";
import NewCardForm from "./new-card-form";

const BoardList = ({ list }: { list: (typeof sampleBoard)[number] }) => {
  const [isAddingNewCard, setIsAddingNewCard] = useState(false);

  return (
    <div
      key={list?.id?.toString()}
      className="rounded-xl bg-[#f1f2f4] dark:bg-[#101204] w-[272px] px-2 py-2"
    >
      <div className="flex justify-between items-start max-w-full">
        <BoardListTitle initialTitle={list.title} />
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 ml-2.5 bg-transparent hover:bg-neutral-hovered"
        >
          <MoreHorizontal size={16} />
        </Button>
      </div>
      <Droppable droppableId={list?.id?.toString()}>
        {(provided, snapshot) => (
          <div
            className="flex flex-col space-y-2 pt-2 pb-3"
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
                      className="px-3 dark:bg-[#22272B] relative pt-2 pb-1 rounded-lg shadow-[0px_1px_1px_#091E4240,0px_0px_1px_#091E424F]"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <h4>{card.title}</h4>
                      <Button variant="ghost" className="rounded-full x-"> <Pencil /></Button>
                     
                    </div>
                  );
                }}
              </Draggable>
            ))}
            {isAddingNewCard && (
              <NewCardForm
                setIsAddingNewCard={setIsAddingNewCard}
                listId={list?.id}
              />
            )}
          </div>
        )}
      </Droppable>

      {!isAddingNewCard && (
        <Button
          variant="outline"
          onClick={() => setIsAddingNewCard(true)}
          className="w-full text-sm justify-start border-0 px-2 py-2 h-auto bg-transparent text-foreground hover:bg-neutral-hovered hover:text-current"
        >
          <Plus className="mr-2" size={16} /> Add a card
        </Button>
      )}
    </div>
  );
};

export default BoardList;
