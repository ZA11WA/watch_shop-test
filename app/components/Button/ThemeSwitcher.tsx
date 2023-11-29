"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineWbSunny } from "react-icons/md";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="text-3xl">
      {theme === 'light' ? (
        <MdOutlineDarkMode onClick={() => setTheme('dark')}  />
      ) : (
        <MdOutlineWbSunny onClick={() => setTheme('light')} />
      )}
    </div>
  );
};

export default ThemeSwitcher;
