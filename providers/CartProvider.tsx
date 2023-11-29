"use client";

import { CartContextProvider } from "@/hooks/useCart";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

interface CartProviderProps {
  children: React.ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <CartContextProvider>{children}</CartContextProvider>;
  }

  return (
    <CartContextProvider>
      <ThemeProvider  attribute="class">
        {children}
      </ThemeProvider>
    </CartContextProvider>
  );
};

export default CartProvider;
