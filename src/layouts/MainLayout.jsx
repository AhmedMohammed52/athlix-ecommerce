import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer/Footer";
import BottomNavigation from "../components/BottomNavigation/BottomNavigation";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />

      <BottomNavigation />
    </>
  );
}
