import { Verify } from "@/components/auth/verify-email";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Verification",
};

const VerifyEmail = () => {
  return (
    <main className="flex flex-col h-full w-full items-center justify-center gap-5">
      <Verify />;
    </main>
  );
};

export default VerifyEmail;
