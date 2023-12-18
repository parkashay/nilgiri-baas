import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { GlobalContextProvider } from "@/context/SidebarContext";
import { ThemeContext } from "@/context/ThemeContext";
import TopLoadingBar from "@/components/TopLoadingBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guest-House",
  description: "Admin dashboard for the guest house booking system.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <TopLoadingBar />
        <ThemeContext>
          <GlobalContextProvider>
            <Header />
            <div className="flex">
              <Sidebar />
              <div className="w-full lg:px-12 py-6 bg-primary/30"> {children} </div>
            </div>
          </GlobalContextProvider>
        </ThemeContext>
      </body>
    </html>
  );
}
