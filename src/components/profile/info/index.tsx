import { UserData } from "@/interfaces/user";
import { formatDateLong } from "@/utils/date_formatter";
import React from "react";
import { MdOutlineError } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ErrorResponse } from "@/interfaces/error";

interface props {
  user: UserData;
}

export const UsernameAndEmailInfo = ({ user }: props) => {
  if (!user) {
    return (
      <div className="flex flex-col gap-1 text-center lg:text-start items-center justify-center animate-pulse">
        <div className="bg-secondary w-14 h-4 rounded-lg"></div>
        <div className="bg-accent w-20 h-2 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 text-center lg:text-start">
      <div className="font-bold text-xl">{user?.username}</div>
      <div className="font-light text-accent">{user?.email}</div>
    </div>
  );
};

export const UserCreationInfo = ({ user }: props) => {
  if (!user) {
    return (
      <div className="opacity-60 bg-accent w-20 h-2 rounded-lg animate-pulse"></div>
    );
  }

  return (
    <div className="opacity-60 text-accent font-light italic text-xs">
      Joined at {formatDateLong(user.createdAt)}
    </div>
  );
};

interface buttonProps extends props {
  error: any;
  isLoading: boolean;
  onClick: () => void;
}

export const ChangePasswordButton = ({
  user,
  error,
  isLoading,
  onClick,
}: buttonProps) => {
  if (!user || isLoading) {
    return (
      <div className="bg-secondary h-[40px] w-full flex justify-center items-center rounded-lg animate-pulse">
        <AiOutlineLoading3Quarters
          size={25}
          className="text-primary animate-spin"
        />
      </div>
    );
  }

  if (error) {
    const err: ErrorResponse = error as ErrorResponse;
    return (
      <div className="bg-secondary text-primary h-[40px] w-full flex justify-center items-center text-center rounded-lg font-bold text-xs gap-2">
        <MdOutlineError size={25} className="text-primary" />
        {err.message}
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="bg-secondary text-primary h-[40px] w-full font-bold text-sm flex justify-center items-center rounded-lg transition-transform duration-300 hover:-translate-y-1 ease-in-out"
    >
      Change password
    </button>
  );
};
