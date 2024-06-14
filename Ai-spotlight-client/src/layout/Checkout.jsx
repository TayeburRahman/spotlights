import { Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import DarkModeContext from "../providers/DarkModeContext ";
const CheckoutLayout = () => {
    const [darkTheme, setDarkTheme] = useState(false);

    const { darkMode, setDarkMode } = useContext(DarkModeContext);
  
    useEffect(() => {
      if (window.localStorage.getItem("DarkTheme") !== null) {
        setDarkTheme(JSON.parse(window.localStorage.getItem("DarkTheme")));
      }
    }, []);
  
    useEffect(() => {
      if (darkTheme === true) {
        document.querySelector("html").classList.add("dark");
        setDarkMode(false) 
      } else {
        document.querySelector("html").classList.remove("dark");
        setDarkMode("dark"); 
      }
  
      window.localStorage.setItem("DarkTheme", JSON.stringify(darkTheme));
    }, [darkTheme]);
  return (
    <main className="parent-main">
      <Helmet>
        <title>Ai Spotlights - Payment</title>
        {/* <meta name="description" content='Ai Spotlights is the largest Ai Tools Directory.A free site to help you find the best AI tools and software to make your work and life more efficient and productive. Updated daily, join millions of followers of our website, newsletter and YouTube.' /> */}
      </Helmet>
      <nav className="border-b border-white dark:border-black">
        <Container>
        <div className="h-[65px]  mx-auto flex items-center justify-between">
          <Link className="text-2xl font-bold" to="/">
            Ai <span className="text-cyan">Spotlights</span>
          </Link>

          <div className="flex justify-between items-center gap-5">
            <button onClick={() => setDarkTheme(!darkTheme)}>
              {darkTheme ? (
                <MdDarkMode className="h-6 w-6" />
              ) : (
                <MdLightMode className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        </Container>
      </nav>
      <Outlet /> 
    </main>
  );
};

export default CheckoutLayout;

// 