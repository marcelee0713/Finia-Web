export type UserData = {
  uid: string;
  username: string;
  email: string;
  emailVerified: string;
  createdAt: string;
  role: string;
} | null;

export interface ProviderData {
  user: UserData;
  setUser: (data: UserData | null) => void;
}
