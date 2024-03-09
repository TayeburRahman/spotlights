import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
const Main = () => {
  return (
    <main className="parent-main">
      <Helmet>
        <title>Ai Spotlights - The Largest Ai Tools Directory</title>
        <meta name="description" content='Ai Spotlights is the largest Ai Tools Directory.A free site to help you find the best AI tools and software to make your work and life more efficient and productive. Updated daily, join millions of followers of our website, newsletter and YouTube.' />
      </Helmet>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Main;

// 