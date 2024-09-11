import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import RightSideBar from "@/components/RightSideBar";

export const metadata: Metadata = {
  title: "DealsOffice",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-mainPageInLight`}>
        
        <div className="w-full flex">
          <section className="bg-mainPageInLight w-full flex min-h-screen flex-1 flex-col transition-colors">
          <Navbar />
            <div dir="rtl" className="w-full flex flex-col justify-center text-[#111] px-4 my-8">
              {children}
            </div>
          </section>
          <RightSideBar />
        </div>
      </body>
    </html>
  );
}
