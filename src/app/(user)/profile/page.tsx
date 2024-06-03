import { ProfileAnalyzedData } from "@/components/profile/profile_analyzed_container";
import { ProfileInfo } from "@/components/profile/profile_info";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

const Profile = () => {
  return (
    <main className="flex-1 flex flex-col lg:flex-row lg:items-center lg:gap-10 xl:gap-20 2xl:gap-24 gap-5 px-5 py-4 lg:px-10 lg:pt-10 mx-auto container overflow-y-auto stylish-y-scroll">
      <ProfileInfo />
      <ProfileAnalyzedData />
    </main>
  );
};

export default Profile;
