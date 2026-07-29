import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { Navbar } from "./components/navbar/navbar";
import { BootstrapClient } from "./components/BootstrapClient";
import { ReactQueryClientProvider } from "./components/React.QueryClient";

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
          <ToastContainer autoClose={3000} position="bottom-right" />
          <BootstrapClient />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}