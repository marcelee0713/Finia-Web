"use client";
import { Toaster, toast } from "sonner";
import { getUserData } from "@/api/user";
import apiUrl from "@/config";
import { ProviderData, UserData } from "@/interfaces/user";
import { createContext, useState, ReactNode, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import useSWR from "swr";
import { AUTH_PAGES } from "@/constants";
import { ErrorResponse } from "@/interfaces/error";

interface props {
  children: ReactNode;
}

export const Context = createContext<ProviderData>({
  user: null,
  setUser: function (data: UserData | null): void {},
});

export const Provider: React.FC<props> = ({ children }) => {
  const [user, setUser] = useState<UserData>(null);

  const [active, setActive] = useState(false);

  const pathname = usePathname();

  const router = useRouter();

  useSWR<UserData>(`${apiUrl}/users`, getUserData, {
    onSuccess(data) {
      setUser(data);

      if (AUTH_PAGES.includes(pathname) && pathname !== "/about") {
        router.replace("/dashboard");
      }
    },
    onError(err) {
      const error = err as ErrorResponse;

      const notAuthorized = error.status === "401";
      const isLoggedIn = !AUTH_PAGES.includes(pathname) && !active;
      const onUniversalPage = user && pathname === "/about" && !active;

      const condition = (notAuthorized && isLoggedIn) || onUniversalPage;

      if (condition) {
        toast.dismiss();

        toast.error("Session expired, please re-login.", {
          duration: 99999999,
          dismissible: false,
          action: {
            label: "Okay",
            onClick: () => {
              setActive(false);
              router.replace("/sign-in");
              toast.dismiss();
            },
          },
        });
      }

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
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#F7DC2A",
            color: "#001220",
            border: "none",
          },
        }}
      />
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => useContext(Context);
