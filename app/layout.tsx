

import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NavBar from "./components/nav/NavBar";

import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";
import FooterList from "./components/footer/FooterList";
import { ThemeProvider } from "next-themes";


const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Tempo Zegara",
  description: "Ecommerce app",
 
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <html lang="en">
      <body
        className={`${poppins.className}

      text-black dark:bg-neutral-800  `}
      >
        <Toaster
          toastOptions={{
            style: {
              background: "rgb(51 65 85)",
              color: "#fff",
              
            },
          }}
        />
        <CartProvider>
        
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <FooterList />
          </div>
        
        </CartProvider>
      </body>
    </html>
  );
}
