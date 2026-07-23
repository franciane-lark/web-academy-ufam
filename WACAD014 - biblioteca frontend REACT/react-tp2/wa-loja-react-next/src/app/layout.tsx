import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; 

import { Navbar } from "./components/navbar/navbar";
import { BootstrapClient } from "./components/BootstrapClient";
import { ReactQueryClientProvider } from "./components/ReactQueryClient";

export const metadata: Metadata = {
  title: "Loja React Next",
  description: "WA Loja React Next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ReactQueryClientProvider>
          <Navbar />
          {children}
          <BootstrapClient />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
