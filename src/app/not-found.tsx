import { ImageBackground } from "@/components/img_bg";
import React from "react";
import bg_2 from "../../public/backgrounds/bg_2.svg";
import { GiShrug } from "react-icons/gi";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col gap-5 h-full w-full items-center justify-center">
      <ImageBackground image={bg_2} />

      <GiShrug className="text-secondary animate-animfadeBelow" size={250} />
      <div className="flex flex-col gap-2 text-center animate-animfadeAbove">
        <div className="font-bold text-4xl text-secondary">Page not found!</div>
        <div className="font-light text-sm text-accent">
          This page does not exist, would you like to go home?
        </div>
      </div>

      <Link
        className="font-bold text-secondary animate-animfadeBelow"
        href={"/"}
      >
        Go home
      </Link>
    </main>
  );
}
