import bg_1 from "../../../../public/backgrounds/bg_1.svg";
import { ImageBackground } from "@/components/img_bg";
import { SignInForm } from "@/components/auth/sign-in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

const SignIn = () => {
  return (
    <main className="flex h-full w-full lg:p-8 overflow-y-auto items-center justify-center p-2">
      <ImageBackground image={bg_1} />
      <SignInForm />
    </main>
  );
};

export default SignIn;
