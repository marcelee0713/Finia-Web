import bg_2 from "../../public/backgrounds/bg_2.svg";
import { Footer } from "@/components/footer";
import { Base } from "@/components/landing_page/base";
import { ImageBackground } from "@/components/img_bg";

export default function Home() {
  return (
    <main className="flex flex-col h-full w-full">
      <ImageBackground image={bg_2} />

      <Base />

      <Footer addPadding={true} addTwoColors={true} isAbsolute={true} />
    </main>
  );
}
