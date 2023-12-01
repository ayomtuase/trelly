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

interface GetTextWidth {
  (text: string, font: string): number | undefined;
  canvas?: HTMLCanvasElement;
}

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

  const getTextWidth: GetTextWidth = useCallback(
    (text: string, font: string) => {
      const canvas =
        getTextWidth.canvas ||
        (getTextWidth.canvas = document.createElement("canvas"));
      const context = canvas.getContext("2d");
      if (!context) return;
      context.font = font;
      const metrics = context.measureText(text);
      return metrics.width;
    },
    []
  );

  const getCssStyle = useCallback(
    (element: HTMLElement | null | undefined, prop: string) => {
      if (typeof window === undefined || !element) return;
      return window.getComputedStyle(element, null).getPropertyValue(prop);
    },
    []
  );

  const getCanvasFont = useCallback(
    (el: HTMLElement | null | undefined = document.body) => {
      const fontWeight = getCssStyle(el, "font-weight") || "normal";
      const fontSize = getCssStyle(el, "font-size") || "16px";
      const fontFamily = getCssStyle(el, "font-family") || "Times New Roman";
      return `${fontWeight} ${fontSize} ${fontFamily}`;
    },
    [getCssStyle]
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef?.current?.focus();
      inputRef?.current?.select();
    }
  }, [isEditing]);

  useOnClickOutside(inputRef, () => setIsEditing(false));

  const inputCallbackRef = useCallback(
    (node: HTMLInputElement) => {
      if (!node) return;
      const width = getTextWidth(inputValue, getCanvasFont(node));

      node.style.width = width ? width + 12 + "px" : "max-content";
      if (!inputRef.current) {
        inputRef.current = node;
      }
    },
    [getCanvasFont, getTextWidth, inputValue]
  );

  return (
    <>
      <div className="max-w-full relative flex h-8">
        <Input
          className={cn(
            "font-bold max-w-full text-lg max-h-8 bg-white rounded-[1px]",
            {
              hidden: !isEditing,
            }
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

        <h1
          className={cn(
            "font-bold m-0 whitespace-nowrap grow overflow-hidden text-ellipsis text-white text-lg hover:bg-[#A6C5E229] cursor-pointer rounded-sm px-2 p-1",
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
