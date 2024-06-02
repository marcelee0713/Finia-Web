import React, { Dispatch, SetStateAction, forwardRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa6";

interface props {
  element: string;
  alignment: "top" | "bottom";
  onElementChange?: Dispatch<SetStateAction<string>>;
  filterArr: string[];
  onPress?: (type?: string) => void;
  width?: string;
  height?: string;
  textFallback?: string;
  additionalStyling?: string;
  additionalDropdownStyling?: string;
}

export const Filter = forwardRef<HTMLDivElement, props>(
  (
    {
      element,
      filterArr,
      onElementChange,
      width,
      height,
      alignment,
      textFallback,
      onPress,
      additionalStyling = "",
      additionalDropdownStyling = "",
    }: props,
    ref
  ) => {
    const [isActive, setIsActive] = useState(false);

    return (
      <div
        ref={ref}
        onClick={() => setIsActive(!isActive)}
        className={`${width ?? "w-[120px]"} relative border ${
          height ?? "h-full"
        } border-borderColor p-3 text-accent rounded-lg text-sm cursor-pointer ${additionalStyling}`}
      >
        <div className="flex w-full h-full items-center justify-between">
          <div className={`font-bold`}>
            {element === "" ? textFallback : element}
          </div>
          <FaCaretDown />
        </div>

        <ul
          className={`${
            isActive ? "block" : "hidden"
          } flex flex-col gap-2 p-2 absolute left-0 ${
            alignment === "top" ? `bottom-10` : `top-10`
          } w-full bg-primary border border-borderColor rounded-lg z-10 ${additionalDropdownStyling}`}
        >
          {filterArr.map((val, i) => {
            const selected: boolean =
              filterArr.findIndex((val) => val === element) === i;

            return (
              <li
                key={i}
                onClick={() => {
                  if (!selected && onElementChange) {
                    onElementChange(filterArr[i]);
                    setIsActive(false);
                  }

                  if (onPress) onPress(filterArr[i]);
                }}
                className={`hover:bg-secondary hover:text-primary rounded-sm px-1 cursor-pointer ${
                  selected ? "bg-secondary text-primary" : ""
                }`}
              >
                {val}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

Filter.displayName = "Filter"; // Add displayName to help with debugging
