import { useBoard } from "@/contexts/board-context";
import { Card as CardType } from "@/models/Card";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import CardEditor from "./card-editor";
import { Button } from "./ui/button";

const Card = ({
  card,
  provided,
  listId,
}: {
  card: CardType;
  provided: DraggableProvided;
  listId: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { openCard } = useBoard();

  return (
    <div className="relative">
      <div
        className="px-3 dark:bg-[#22272B] group flex relative py-2 rounded-lg !cursor-pointer shadow-[0px_1px_1px_#091E4240,0px_0px_1px_#091E424F]"
        ref={provided.innerRef}
        onClick={() => openCard(card)}
        onContextMenu={(e) => {
          e.preventDefault();
          setIsEditing(true);
        }}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <h4>{card.title}</h4>
        <Button
          variant="ghost"
          onClick={() => setIsEditing(true)}
          className="rounded-full hidden group-hover:flex absolute h-8 w-8 p-0 top-0 right-0"
        >
          <Pencil size={16} />
        </Button>
      </div>
      {isEditing ? (
        <CardEditor card={card} setIsEditing={setIsEditing} listId={listId} />
      ) : null}
    </div>
  );
};

export default Card;
