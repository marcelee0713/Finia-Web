"use client";
import { logOut } from "@/api/user";
import apiUrl from "@/config";
import { CallbacksInterface } from "@/interfaces/form";
import { useRouter } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const router = useRouter();
  const cb: CallbacksInterface = {
    onLoading() {
      console.log("Loading....");
    },
    onError(result) {
      console.error(result.message);
      console.table(result);
    },
    onSuccess(result) {
      console.log(result);
      router.replace("/sign-in");
    },
  };
  return (
    <main className="flex flex-col h-full w-full p-8 overflow-y-auto items-center justify-center">
      <button
        onClick={async () => logOut(`${apiUrl}/users/logout`, cb)}
        className="text-accent"
      >
        Log out
      </button>
    </main>
  );
};

export default Dashboard;
