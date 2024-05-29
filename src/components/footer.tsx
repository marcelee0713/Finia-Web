import Link from "next/link";
import React from "react";

interface props {
  isAbsolute?: boolean;
  addTwoColors?: boolean;
  addPadding?: boolean;
  isContainer?: boolean;
  removePaddingXAxis?: boolean;
}

export const Footer = ({
  addPadding,
  addTwoColors,
  isAbsolute,
  isContainer,
  removePaddingXAxis,
}: props) => {
  const style = `flex ${
    isAbsolute ? "absolute bottom-0 w-full" : ""
  } justify-between text-sm font-light text-secondary ${
    addPadding ? "px-4 pb-4 lg:py-4 lg:px-8" : ""
  }  ${isContainer ? "container mx-auto" : ""} ${
    removePaddingXAxis ? "px-0" : ""
  }`;

  return (
    <footer
      className={
        style + " flex-col items-center justify-center text-center lg:flex-row"
      }
    >
      <div
        className={`animate-animfadeLeftSide flex gap-2 ${
          addTwoColors ? "text-secondary lg:text-primary" : "text-secondary"
        }`}
      >
        <Link className="hover:underline" href={"/about"}>
          About
        </Link>
        •
        <Link className="hover:underline" href={"/about#contact"}>
          Contact
        </Link>
        •
        <Link className="hover:underline" href={"/about#privacy-policy"}>
          Privacy Policy
        </Link>
      </div>
      <div className="animate-animfadeRightSide">
        © 2024 • Marcel Magbual • All rights reserved
      </div>
    </footer>
  );
};
