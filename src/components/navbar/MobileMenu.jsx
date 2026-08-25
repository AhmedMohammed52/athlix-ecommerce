import { Link, NavLink } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";
import { FiUser, FiLogOut } from "react-icons/fi";

import Logo from "./Logo";

import navLinks from "../../data/navbarData";
import sportsData from "../../data/sportsData";

import { useAuth } from "../../context/AuthContext";

export default function MobileMenu({ isMenuOpen, setIsMenuOpen }) {
  const { user, logout } = useAuth();

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  async function handleLogout() {
    try {
      await logout();
      handleCloseMenu();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm border-r border-border bg-background shadow-lg transition-transform duration-300 ease-in-out ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        className="absolute right-4 top-4 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Close menu"
        onClick={handleCloseMenu}
      >
        <HiXMark className="size-5" />
      </button>

      <div className="flex h-full flex-col">
        <div className="border-b border-border p-6">
          <Logo />
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Shop by sport
            </p>

            {sportsData.map((sport) => (
              <Link
                to={sport.path}
                key={sport.name}
                onClick={handleCloseMenu}
                className="flex items-center gap-3 rounded-xl p-3 text-base font-medium transition-colors hover:bg-muted"
              >
                <img
                  src={sport.image}
                  alt={sport.name}
                  loading="lazy"
                  className="size-10 rounded-lg object-cover"
                />

                {sport.name}
              </Link>
            ))}
          </div>

          <div>
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Explore
            </p>

            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={handleCloseMenu}
                className={({ isActive }) =>
                  `block rounded-xl p-3 transition-colors ${
                    isActive ? "bg-muted font-semibold" : "hover:bg-muted"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="border-t border-border p-4">
          {user ? (
            <div className="space-y-2">
              <Link
                to="/account"
                onClick={handleCloseMenu}
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                <FiUser className="size-4" />
                My Account
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
              >
                <FiLogOut className="size-4" />
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={handleCloseMenu}
              className="flex h-12 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
