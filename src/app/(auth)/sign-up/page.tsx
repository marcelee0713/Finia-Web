import bg_1 from "../../../../public/backgrounds/bg_1.svg";
import { ImageBackground } from "@/components/img_bg";
import { SignUpForm } from "@/components/auth/sign-up";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUp = () => {
  return (
    <main className="flex h-full w-full lg:p-8 overflow-y-auto items-center justify-center p-2">
      <ImageBackground image={bg_1} />
      <SignUpForm />
    </main>
  );
};

export default SignUp;
