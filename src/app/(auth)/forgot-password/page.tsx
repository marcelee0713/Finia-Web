import bg_2 from "../../../../public/backgrounds/bg_2.svg";
import { ImageBackground } from "@/components/img_bg";
import { ForgotPasswordForm } from "@/components/auth/forgot-password";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};

const ForgotPassword = () => {
  return (
    <main className="flex h-full w-full lg:p-8 overflow-y-auto items-center justify-center p-2">
      <ImageBackground image={bg_2} />

      <ForgotPasswordForm />
    </main>
  );
};

export default ForgotPassword;
