"use client";

import { logOut } from "@/api/user";
import { useGlobalContext } from "@/app/context/provider";
import apiUrl from "@/config";
import { CallbacksInterface } from "@/interfaces/form";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export const NavBar = () => {
  const { setUser } = useGlobalContext();
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
    onSuccess() {
      setProcessing(false);
      toast.dismiss();
      router.replace("/sign-in");
      setUser(null);
    },
  };

  return (
    <nav className="flex py-5 px-10 h-[60px] border-b border-borderColor text-secondary animate-animfadeAbove">
      <div className="flex items-center justify-between h-full w-full container mx-auto">
        <div className="flex gap-5">
          <div className="font-bold text-2xl">Finia</div>

          <div className="flex gap-2 text-sm">
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
          onClick={async () => await logOut(`${apiUrl}/users/logout`, cb)}
          className="text-secondary text-sm font-light cursor-pointer"
        >
          Log out
        </button>
      </div>
    </nav>
  );
};
