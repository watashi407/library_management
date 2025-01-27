import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const imbPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    {
      path: "/fonts/IBMPlexSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  generator: "Next.js",
  applicationName: "Watashi Libro",
  referrer: "origin-when-cross-origin",
  description:
    "Watashi Libro - Its a Library Management that used in an University  ",
  keywords: ["Library", "Watashi", "Watashi Libro", "Library Management"],
  authors: [
    { name: "Watshi" },
    { name: "Alvin", url: "https://github.com/watashi407/library_management" },
  ],
  creator: "Alvin Gultiano",
  publisher: "Vercel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <meta
        name="google5cb19de4be69b492"
        content="c-o3TFknDr8XskMwfA2arY5lwGq-w8c13f7EjZzFECA"
      />
      <SessionProvider session={session}>
        <body
          className={`${imbPlexSans.className} ${bebasNue.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
