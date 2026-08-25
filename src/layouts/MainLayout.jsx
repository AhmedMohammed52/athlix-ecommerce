import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer/Footer";
import BottomNavigation from "../components/BottomNavigation/BottomNavigation";
import ScrollToTop from "../components/ui/ScrollToTop";

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />

      <Navbar />

      <Outlet />

      <Footer />

      <BottomNavigation />
    </>
  );
}
