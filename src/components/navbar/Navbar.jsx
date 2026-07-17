import { useState } from "react";

import TopBar from "./TopBar";

import MobileMenu from "./MobileMenu";

import MenuOverlay from "./MenuOverlay";

import NavbarHeader from "./NavbarHeader";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <TopBar />

      <NavbarHeader
        isMenuOpen={isMenuOpen}
        isSearchOpen={isSearchOpen}
        setIsMenuOpen={setIsMenuOpen}
        setIsSearchOpen={setIsSearchOpen}
      />

      <MenuOverlay isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
}
