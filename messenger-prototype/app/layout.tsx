import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Messenger",
  description: "Messenger Inbox Prototype",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen md:flex md:items-center md:justify-center">
        <div className="mx-auto w-[440px] h-[956px] bg-white relative shadow-2xl md:rounded-[55px] md:overflow-hidden md:border md:border-gray-300 md:ring-[14px] md:ring-gray-800">
          <div className="h-full overflow-hidden md:rounded-[55px]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
