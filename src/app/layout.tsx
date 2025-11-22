import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Patisserie Miwa | Artisan Japanese-French Pastries in Lagos",
  description: "Experience the art of Japanese-French patisserie. Exquisite handcrafted desserts where tradition meets innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-poppins antialiased">
        {children}
      </body>
    </html>
  );
}