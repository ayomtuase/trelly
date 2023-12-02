"use client";

import { cn } from "@/lib/utils";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Textarea } from "@/components/ui/textarea";
import useOnClickOutside from "@/hooks/use-click-outside";

const BoardListTitle = ({ initialTitle }: { initialTitle: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [inputValue, setInputValue] = useState(title);

  const onInputChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  };

  if (title !== inputValue) {
    if (!inputValue && !isEditing) {
      setInputValue(title);
    }
    if (inputValue) {
      setTitle(inputValue);
    }
  }

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useOnClickOutside(inputRef, () => setIsEditing(false));

  const updateInputHeight = (el: HTMLTextAreaElement | null) => {
    if (!el) return;
    el.style.height = `0px`;
    el.style.height = `${el?.scrollHeight}px`;
  };

  const inputCallbackRef = useCallback((node: HTMLTextAreaElement) => {
    if (!node) return;
    inputRef.current = node;
    updateInputHeight(node);
  }, []);

  useEffect(() => {
    updateInputHeight(inputRef?.current);
  }, [inputValue]);

  useEffect(() => {
    if (isEditing) {
      inputRef?.current?.focus();
      inputRef?.current?.select();
    }
  }, [isEditing]);

  return (
    <div className="grow h-auto text-sm">
      {isEditing && (
        <Textarea
          className={cn(
            "font-bold w-full bg-popover pl-[7.5px] pr-2 pt-[9px] pb-2.5 leading-4 overflow-y-hidden rounded-sm resize-none"
          )}
          ref={inputCallbackRef}
          value={inputValue}
          onChange={onInputChange}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsEditing(false);
            }
          }}
        />
      )}

      <h1
        className={cn(
          "font-bold m-0 cursor-pointer py-2.5 leading-4 [overflow-wrap:anywhere] ml-2",
          {
            hidden: isEditing,
          }
        )}
        role="textbox"
        onClick={() => setIsEditing(true)}
      >
        {title}
      </h1>
    </div>
  );
};

export default BoardListTitle;
