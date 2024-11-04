import type { Metadata, Viewport } from "next";
import "../assets/styles/main.scss";
import { Root } from "../components/Root";

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
      <body>
        <div id="wrap">
          <div id="content">
            <Root>{children}</Root>
          </div>
        </div>
      </body>
    </html>
  );
}
