import "./globals.css";
import type { Metadata } from "next";
import NavBar from "./components/nav/NavBar";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer/Footer";

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
        className="

      text-black dark:bg-neutral-800  "
      >
        <Toaster
          toastOptions={{
            style: {
              background: "rgb(10 20 30)",
              color: "#fff",
            },
          }}
        />
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
