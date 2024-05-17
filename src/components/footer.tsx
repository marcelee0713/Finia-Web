import Link from "next/link";
import React from "react";

interface props {
  isAbsolute?: boolean;
  addTwoColors?: boolean;
  addPadding?: boolean;
}

export const Footer = ({ addPadding, addTwoColors, isAbsolute }: props) => {
  const style = `flex ${
    isAbsolute ? "absolute bottom-0 w-full" : ""
  } justify-between text-sm font-light text-secondary ${
    addPadding ? "py-4 px-8" : ""
  }`;

  return (
    <footer className={style}>
      <div
        className={`animate-animfadeLeftSide flex gap-2 ${
          addTwoColors ? "text-primary" : "text-secondary"
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
