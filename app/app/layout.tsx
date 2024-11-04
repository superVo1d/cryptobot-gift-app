import type { Metadata, Viewport } from "next";
import "../assets/styles/main.scss";
import { Root } from "../components/Root";
import { Navbar } from "../components/Navbar";
import Head from "next/head";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Gift App",
};

export const viewport: Viewport = {
  width: "device-width",
  userScalable: false,
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <Script src="https://telegram.org/js/telegram-web-app.js" />
      </Head>
      <body>
        <Root>
          {children}
          <Navbar />
        </Root>
      </body>
    </html>
  );
}
