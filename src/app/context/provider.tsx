"use client";
import { Toaster, toast } from "sonner";
import { getUserData } from "@/api/user";
import apiUrl from "@/config";
import { ProviderData, UserData } from "@/interfaces/user";
import { createContext, useState, ReactNode, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import useSWR from "swr";
import { AUTH_PAGES, USER_PAGES } from "@/constants";
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

  const pathname = usePathname();

  const router = useRouter();

  useSWR<UserData>("/api/user", getUserData, {
    revalidateOnFocus: false,
    onSuccess(data) {
      setUser(data);

      if (AUTH_PAGES.includes(pathname) && pathname !== "/about") {
        router.replace("/dashboard");
      }
    },
    onError(err) {
      const error = err as ErrorResponse;

      const notAuthorized = error.status === "401";

      const isLoggedIn = USER_PAGES.includes(pathname);

      const condition = isLoggedIn && notAuthorized;

      if (condition) {
        toast.dismiss();

        toast.error("Session expired, please re-login.", {
          duration: 99999999,
          dismissible: false,
          action: {
            label: "Okay",
            onClick: () => {
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
          classNames: {
            closeButton: "bg-secondary border-borderColor ",
          },
        }}
      />
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => useContext(Context);
