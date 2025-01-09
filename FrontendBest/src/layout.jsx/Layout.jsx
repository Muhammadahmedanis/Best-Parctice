import { Outlet } from "react-router-dom";
import Nvabar from "../components/Nvabar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Nvabar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
