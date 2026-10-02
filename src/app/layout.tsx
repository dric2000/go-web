import { ToastProvider } from "@/components/toast-provider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GO",
  description:
    "Réserve ou propose un trajet en covoiturage entre les villes du Bénin, simplement et en toute confiance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
