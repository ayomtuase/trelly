"use client";

import { useBoard } from "@/contexts/board-context";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const NewCardForm = ({
  setIsAddingNewCard,
  listId,
}: {
  setIsAddingNewCard: Dispatch<SetStateAction<boolean>>;
  listId: string | number;
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { setBoard } = useBoard();

  const onInputChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  };

  const updateInputHeight = (el: HTMLTextAreaElement | null) => {
    if (!el) return;
    el.style.height = `0px`;
    el.style.height = `${el?.scrollHeight + 32}px`;
  };

  const inputCallbackRef = useCallback((node: HTMLTextAreaElement) => {
    if (!node) return;
    node?.focus()
    inputRef.current = node;
  }, []);

  useEffect(() => {
    updateInputHeight(inputRef?.current);
  }, [inputValue]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!inputValue) {
      setIsAddingNewCard(false);
      return;
    }
    setBoard((prev) => {
      const listIndex = prev?.findIndex((list) => list?.id === listId);
      const newList = {
        ...prev[listIndex],
        cards: [
          ...prev[listIndex]?.cards,
          { id: "34", title: inputValue, description: "" },
        ],
      };

      return prev?.toSpliced(listIndex, 1, newList);
    });
    setInputValue("");
  };

  return (
    <form onSubmit={onSubmit}>
      <Textarea
        className={cn(
          "w-full bg-popover px-3 py-2 leading-4 max-h-[162px] overflow-y-auto rounded-sm resize-none"
        )}
        value={inputValue}
        placeholder="Enter a title for this card..."
        ref={inputCallbackRef}
        onChange={onInputChange}
      />
      <div className="flex space-x-1.5 mt-2">
        <Button
          type="submit"
          className="h-8 px-3 py-1.5 bg-brand text-text-inverse"
        >
          Add card
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setInputValue("");
            setIsAddingNewCard(false);
          }}
          className="w-8 h-8 ml-2.5 bg-transparent hover:bg-neutral-hovered"
        >
          <X size={16} />
        </Button>
      </div>
    </form>
  );
};

export default NewCardForm;
