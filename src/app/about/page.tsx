import { AboutInfo, AboutInfoWithList } from "@/components/about/info";
import { ABOUT_US_INFOS, aboutInfoList } from "@/constants";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
};

const About = () => {
  return (
    <main className="flex flex-col h-full w-full lg:p-8 overflow-y-auto stylish-y-scroll p-2">
      <Link
        href={"/"}
        className="self-end text-accent font-light animate-animfadeRightSide"
      >
        Go back
      </Link>
      <div className="flex-1 flex flex-col gap-10 animate-animfadeLeftSide">
        <div className="flex flex-col gap-2">
          <div className="font-bold text-secondary text-5xl">About us</div>
          <div className="flex flex-col gap-5 text-base font-light text-accent">
            <p>{ABOUT_US_INFOS.about1}</p>
            <p>{ABOUT_US_INFOS.about2}</p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="font-bold text-secondary text-5xl">
            Terms of Agreement & Privacy Policy
          </div>

          {aboutInfoList.map((val, index) => {
            if (val.list) {
              return (
                <AboutInfoWithList
                  head={val.head}
                  sub={val.sub}
                  infos={val.list}
                  id={val.id}
                  key={index}
                />
              );
            }

            return (
              <AboutInfo
                key={index}
                head={val.head}
                sub={val.sub}
                id={val.id}
              />
            );
          })}
        </div>
        <div className="font-light text-accent">
          This document was last updated on May 17, 2024.
        </div>
      </div>
    </main>
  );
};

export default About;
