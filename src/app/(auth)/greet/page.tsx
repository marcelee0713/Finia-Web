import { ImageBackground } from "@/components/img_bg";
import React from "react";
import bg_2 from "../../../../public/backgrounds/bg_2.svg";
import { Wave } from "@/components/auth/greet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome",
};

const Greet = () => {
  return (
    <main className="flex flex-col h-full w-full items-center justify-center">
      <ImageBackground image={bg_2} />

      <Wave />
    </main>
  );
};

export default Greet;
