"use client";

import { Toaster } from "sonner";
import { getUserData } from "@/api/user";
import apiUrl from "@/config";
import { ProviderData, UserData } from "@/interfaces/user";
import { createContext, useState, ReactNode, useContext } from "react";
import useSWR from "swr";

interface props {
  children: ReactNode;
}

export const Context = createContext<ProviderData>({
  user: null,
  setUser: function (data: UserData | null): void {},
});

export const Provider: React.FC<props> = ({ children }) => {
  const [user, setUser] = useState<UserData>(null);

  useSWR<UserData>(`${apiUrl}/users`, getUserData, {
    onSuccess(data) {
      setUser(data);
    },
    onError() {
      setUser(null);
    },
  });

  return (
    <Context.Provider
      value={{
        user,
        setUser(data) {
          setUser(data);
        },
      }}
    >
      <Toaster />
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => useContext(Context);
