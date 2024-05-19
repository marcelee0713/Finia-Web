"use client";
import { logOut } from "@/api/user";
import apiUrl from "@/config";
import { CallbacksInterface } from "@/interfaces/form";
import { useRouter } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const router = useRouter();

  return (
    <main className="flex-1 flex flex-col h-full w-full p-8 overflow-y-auto items-center justify-center">
      Dashboard
    </main>
  );
};

export default Dashboard;
