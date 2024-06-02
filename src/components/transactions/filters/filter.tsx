import { TransactionTypes } from "@/types/transaction";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FaCaretDown } from "react-icons/fa6";

interface props {
  element: string;
  onElementChange?: Dispatch<SetStateAction<string>>;
  filterArr: string[];
  onPress?: (type?: string) => void;
  width?: string;
  textFallback?: string;
  alignment: "top" | "bottom";
}

export const Filter = ({
  element,
  filterArr,
  onElementChange,
  onPress,
  width,
  textFallback,
  alignment,
}: props) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      onClick={() => setIsActive(!isActive)}
      className={`h-full ${
        width ?? "w-[120px]"
      } relative border border-borderColor p-3 text-accent rounded-lg text-sm cursor-pointer`}
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
          alignment === "top" ? "bottom-10" : "top-10"
        } w-full bg-primary border border-borderColor rounded-lg z-10`}
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
};
