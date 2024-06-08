"use client";
import { useGlobalContext } from "@/app/context/provider";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { TransactionsCount } from "./transactions_data";
import {
  ChangePasswordButton,
  UserCreationInfo,
  UsernameAndEmailInfo,
} from "./info";
import { ChangePassword } from "./change-password";
import useSWRImmutable from "swr/immutable";
import apiUrl from "@/config";
import { getUserPass } from "@/api/user";

export const ProfileInfo = () => {
  const { user } = useGlobalContext();
  const [isActive, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: password, error } = useSWRImmutable<string>(
    user ? `${apiUrl}/users/get-password?token=${user.token}` : null,
    getUserPass,
    {
      onSuccess() {
        setIsLoading(false);
      },
      onError() {
        setIsLoading(false);
      },
      revalidateOnMount: true,
    }
  );

  return (
    <div className="w-full lg:w-[300px] flex flex-col gap-5 text-secondary items-center lg:items-start">
      <FaUserCircle size={200} className="self-center" />

      <UsernameAndEmailInfo user={user} />

      <ChangePasswordButton
        user={user}
        error={error}
        isLoading={isLoading}
        onClick={() => {
          if (user) setActive(true);
        }}
      />

      <hr className="border-borderColor self-stretch" />

      <TransactionsCount user={user} useCase="TOTAL_TRANSACTIONS_INFO" />

      <UserCreationInfo user={user} />

      {isActive && password && user && (
        <ChangePassword
          setModal={setActive}
          currentPassword={password}
          userId={user.uid}
        />
      )}
    </div>
  );
};
