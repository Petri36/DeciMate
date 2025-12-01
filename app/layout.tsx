import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { DecisionProvider } from "@/context/DecisionContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-clash-display", // Mapping to our config variable name
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-neue-montreal", // Mapping to our config variable name
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DeciMate",
  description: "La única app que te dice la posta sin chamuyar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={cn(
          spaceGrotesk.variable,
          jakarta.variable,
          "font-sans bg-void min-h-screen selection:bg-passion selection:text-white"
        )}
      >
        <DecisionProvider>{children}</DecisionProvider>
      </body>
    </html>
  );
}
