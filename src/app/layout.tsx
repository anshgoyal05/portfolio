import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import BrowserOptimizations from "@/components/BrowserOptimizations";
import { ResumeModalProvider } from "@/components/ResumeModal";

export const metadata: Metadata = {
  title: "Ansh Goyal | AI & Full-Stack Developer",
  description: "Professional portfolio of Ansh Goyal, Computer Science student at Chitkara University. Built with Next.js, MERN stack, OpenCV, and AI systems.",
  keywords: ["Ansh Goyal", "Full Stack Developer", "AI Developer", "MERN Stack", "Next.js", "FastAPI", "Chitkara University"],
  authors: [{ name: "Ansh Goyal" }],
  openGraph: {
    title: "Ansh Goyal | AI & Full-Stack Developer",
    description: "Creative developer portfolio of Ansh Goyal. Specializing in Next.js, MERN stack, and AI-powered grience systems.",
    url: "https://goyalansh.in",
    siteName: "Ansh Goyal Portfolio",
    type: "website",
    locale: "en_US"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full select-none">
      <body className="bg-black text-white antialiased overflow-x-hidden min-h-full">
        <BrowserOptimizations />
        <SmoothScroll>
          <ResumeModalProvider>
            <Preloader />
            <CustomCursor />
            {children}
          </ResumeModalProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}

