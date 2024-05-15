import { UserData } from "@/interfaces/user";

export const getUserData = async (endpoint: string): Promise<UserData> => {
  const res = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "include",
    method: "GET",
  });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the feed.");
    throw error;
  }

  const user: UserData = await res.json();
  return user;
};
