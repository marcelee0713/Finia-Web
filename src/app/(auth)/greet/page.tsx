"use client";
import { ImageBackground } from "@/components/img_bg";
import { useSearchParams } from "next/navigation";
import React from "react";
import bg_2 from "../../../../public/backgrounds/bg_2.svg";
import welcome from "../../../../public/icons/base/welcome-hand.svg";
import Image from "next/image";
import Link from "next/link";

const Greet = () => {
  const params = useSearchParams();

  const username = params.get("username");

  const email = params.get("email");

  return (
    <main className="flex flex-col h-full w-full items-center justify-center">
      <ImageBackground image={bg_2} />

      <div className="flex flex-col gap-5 items-center justify-center">
        <Image
          alt="A waving hand"
          src={welcome}
          quality={100}
          sizes="100vw"
          height={250}
          width={250}
          className="animate-wiggle"
        />
        <div className="flex flex-col gap-2 text-center animate-animfadeAbove">
          <div className="font-bold text-4xl text-secondary">
            {username ? `Welcome, ${username}!` : "Hello!"}
          </div>
          <div className="font-light text-sm text-accent">
            {email
              ? `We have sent you an email verification to ${email}`
              : "Seems like you went here by yourself?"}
          </div>
        </div>
        {username && email && (
          <Link
            className="font-bold text-secondary animate-animfadeBelow"
            href={"/sign-in"}
          >
            Sign in
          </Link>
        )}
      </div>
    </main>
  );
};

export default Greet;
