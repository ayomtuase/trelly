import { useBoard } from "@/contexts/board-context";
import { Card } from "@/models/Card";
import { CreditCard } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const CardEditor = ({
  card,
  setIsEditing,
  listId,
}: {
  card: Card;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  listId: string;
}) => {
  const [title, setTitle] = useState(card?.title);
  const { setBoard, openCard } = useBoard();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const inputCallbackRef = useCallback((node: HTMLTextAreaElement) => {
    if (!node) return;
    node?.focus();
    node?.select();
    inputRef.current = node;
  }, []);

  const updateInputHeight = (el: HTMLTextAreaElement | null) => {
    if (!el) return;
    el.style.height = `0px`;
    const scrollHeight = el?.scrollHeight;
    el.style.height = `${scrollHeight < 48 ? 48 : scrollHeight}px`;
  };

  useEffect(() => {
    updateInputHeight(inputRef?.current);
  }, [title]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsEditing(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setIsEditing]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!title) return;
    setBoard((prev) => {
      const listIndex = prev?.findIndex((list) => list?.id === listId);
      const currentCardIndex = prev[listIndex]?.cards?.findIndex(
        (c) => c?.id === card?.id
      );
      const currentCard = prev[listIndex]?.cards?.[currentCardIndex];

      const newCardData = { ...currentCard, title };

      const newList = {
        ...prev[listIndex],
        cards: prev?.[listIndex]?.cards?.toSpliced(
          currentCardIndex,
          1,
          newCardData
        ),
      };

      return prev?.toSpliced(listIndex, 1, newList);
    });

    setIsEditing(false);
  };

  return (
    <div className="absolute top-0 left-0 right-2 z-20">
      <button
        title="Exit editing"
        className="fixed inset-0 bg-black/60 -z-10 cursor-auto"
        onClick={() => setIsEditing(false)}
      />
      <div className="z-10">
        <form className="flex flex-col items-start w-full" onSubmit={onSubmit}>
          <div className="px-3 pt-2 pb-1 bg-popover w-full rounded-md">
            <Textarea
              className={
                "w-full px-0 border-none py-0 bg-transparent focus-visible:ring-0 overflow-y-hidden rounded-sm resize-none"
              }
              value={title}
              rows={3}
              placeholder="Enter a title for this card..."
              ref={inputCallbackRef}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e?.currentTarget?.form?.requestSubmit();
                  setIsEditing(false);
                }
              }}
            />
          </div>
          <Button
            type="submit"
            className="h-8 px-3 py-1.5 mt-2 bg-brand text-text-inverse"
          >
            Save
          </Button>
        </form>
        <div className="flex flex-col space-x-2 absolute top-0 right-0 translate-x-[calc(100%+8px)]">
          <Button
            asChild
            onClick={() => openCard(card)}
            className="bg-popover text-black dark:text-foreground hover:bg-[#454F59] px-2.5 py-1.5 h-auto rounded"
          >
            <Link href="">
              <CreditCard className="mr-2" size={16} />
              Open card
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardEditor;
