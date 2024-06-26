"use client";

import { logOut } from "@/api/user";
import { useGlobalContext } from "@/app/context/provider";
import apiUrl from "@/config";
import { CallbacksInterface } from "@/interfaces/form";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { IoMenu } from "react-icons/io5";
import { mutate } from "swr";
import { clearCache } from "@/utils/clear_cache";

export const NavBar = () => {
  const { user, setUser } = useGlobalContext();

  const [active, setActive] = useState(false);

  const [processing, setProcessing] = useState(false);

  const pathname = usePathname();

  const router = useRouter();

  const cb: CallbacksInterface = {
    onLoading() {
      setProcessing(true);
      toast.dismiss();
      toast.loading("Logging out...");
    },
    onError(result) {
      setProcessing(false);
      toast.dismiss();
      toast.error(result.message);
    },
    async onSuccess() {
      router.replace("/sign-in");
      setProcessing(false);
      setUser(null);
      await clearCache();
      mutate(`/api/user`);
      mutate(`${apiUrl}/users/get-password`);
      toast.dismiss();
    },
  };

  return (
    <nav className="flex flex-col px-5 py-4 lg:py-5 lg:px-10 lg:h-[60px] border-b border-borderColor text-secondary animate-animfadeAbove">
      <div className="flex items-center justify-between h-full w-full container mx-auto">
        <div className="flex gap-5">
          <Link href={"/dashboard"} className="font-bold text-2xl">
            Finia
          </Link>

          <div className="hidden gap-2 text-sm lg:flex">
            <Link
              href={"/profile"}
              className={`nav-item ${
                pathname === "/profile" ? "active-nav" : ""
              }`}
            >
              profile
            </Link>

            <Link
              href={"/dashboard"}
              className={`nav-item ${
                pathname === "/dashboard" ? "active-nav" : ""
              }`}
            >
              dashboard
            </Link>

            <Link
              href={"/transactions"}
              className={`nav-item ${
                pathname === "/transactions" ? "active-nav" : ""
              }`}
            >
              transactions
            </Link>
          </div>
        </div>

        <button
          disabled={processing}
          onClick={async () => await logOut(`/api/sign-out`, cb, user?.token)}
          className="hidden lg:block text-secondary text-sm font-light cursor-pointer"
        >
          Log out
        </button>

        <IoMenu
          onClick={() => {
            setActive(!active);
          }}
          className="text-secondary lg:hidden cursor-pointer"
          size={40}
        />
      </div>
      <div
        className={`${
          active ? "flex" : "hidden"
        } flex flex-col gap-2 lg:hidden container mx-auto`}
      >
        <Link
          href={"/profile"}
          className={`nav-item ${pathname === "/profile" ? "active-nav" : ""}`}
        >
          profile
        </Link>

        <Link
          href={"/dashboard"}
          className={`nav-item ${
            pathname === "/dashboard" ? "active-nav" : ""
          }`}
        >
          dashboard
        </Link>

        <Link
          href={"/transactions"}
          className={`nav-item ${
            pathname === "/transactions" ? "active-nav" : ""
          }`}
        >
          transactions
        </Link>

        <button
          disabled={processing}
          onClick={async () => await logOut(`/api/sign-out`, cb, user?.token)}
          className="text-secondary text-sm font-light cursor-pointer"
        >
          Log out
        </button>
      </div>
    </nav>
  );
};
