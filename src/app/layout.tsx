import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Provider } from "./context/provider";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Finia",
  description:
    "A simplest way to manage and visualize your expenses and revenue in ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen max-w-full scroll-smooth">
      <body
        className={`${openSans.className} w-full h-full bg-primary flex relative`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
