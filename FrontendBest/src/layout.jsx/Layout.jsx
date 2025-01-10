import { Outlet } from "react-router-dom";
import Nvabar from "../components/Nvabar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { ThemeContextProvider } from "../context/themeContext";

const Layout = () => {
  const[theme, setTheme] = useState(() => {
    return JSON.parse(localStorage.getItem("theme")) || "light"
  });
   
  const lightThemeMode = () => {
    setTheme("light");
  }
  const darkThemeMode = () => {
    setTheme("dark")
  }

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    setTheme(theme)
  }, [theme])

  return (
    <ThemeContextProvider value={{theme, lightThemeMode, darkThemeMode}}>
      <div className={`${theme} flex flex-col min-h-screen`}>
        <Nvabar />
        <div className="bg-gray-500 flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </ThemeContextProvider>
  );
};

export default Layout;
