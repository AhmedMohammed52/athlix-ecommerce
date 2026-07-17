import { FaBars } from "react-icons/fa6";

import DesktopNav from "./DesktopNav";

import Logo from "./Logo";

import NavbarActions from "./NavbarActions";

import SearchBar from "./SearchBar";

export default function NavbarHeader({
  isMenuOpen,
  isSearchOpen,
  setIsMenuOpen,
  setIsSearchOpen,
}) {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 duration-300 transition-all border-b border-border/60 backdrop-blur-xl">
      <div className="container-athlix flex items-center h-16 md:h-20 gap-6 ">
        <button
          type="button"
          aria-label="Open menu"
          className="size-11 rounded-full inline-flex items-center justify-center text-foreground hover:bg-muted md:hidden transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars className="size-5" />
        </button>

        <Logo />

        <DesktopNav />

        <NavbarActions
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />
      </div>

      <SearchBar
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
    </header>
  );
}
