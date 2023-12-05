"use client";

import useOnClickOutside from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input } from "./ui/input";

const BoardTitle = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Test Board Title");
  const [inputValue, setInputValue] = useState(title);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
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

  const updateInputWidth = (el: HTMLInputElement | null) => {
    if (!el) return;
    console.log({ scrollWidth: el?.scrollWidth });

    el.style.width = `0px`;
    el.style.width = `${el?.scrollWidth + 2}px`;
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef?.current?.focus();
      inputRef?.current?.select();
    }
  }, [isEditing]);

  useOnClickOutside(inputRef, () => setIsEditing(false));

  const inputCallbackRef = useCallback((node: HTMLInputElement) => {
    if (!node) return;
    inputRef.current = node;
    updateInputWidth(node);
  }, []);

  useEffect(() => {
    updateInputWidth(inputRef?.current);
  }, [inputValue]);

  return (
    <>
      <div className="max-w-full relative flex h-8">
        {isEditing && (
          <Input
            className={cn(
              "font-bold max-w-full px-2 leading-7  text-lg max-h-8 bg-white rounded-[1px]"
            )}
            ref={inputCallbackRef}
            type="text"
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
            "font-bold m-0 whitespace-nowrap grow overflow-hidden text-ellipsis text-white text-lg hover:bg-neutral-hovered cursor-pointer rounded-sm px-2",
            {
              hidden: isEditing,
            }
          )}
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h1>
      </div>
    </>
  );
};

export default BoardTitle;
