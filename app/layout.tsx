import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Providers from "./contexts/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zentry",
  description: "Task management system",
};

const poppins = Poppins({
  variable: "--font-poppins",
  weight: "600",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}  antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
