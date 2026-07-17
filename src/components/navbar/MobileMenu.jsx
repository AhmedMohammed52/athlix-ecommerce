import { Link, NavLink } from "react-router-dom";

import Logo from "./Logo";

import { HiXMark } from "react-icons/hi2";

import navLinks from "./navbarData";

import sportsData from "./sportsData";

export default function MobileMenu({ isMenuOpen, setIsMenuOpen }) {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm bg-background border-r border-border shadow-lg transition-transform duration-300 ease-in-out
      ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <button
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="close menu"
        onClick={() => setIsMenuOpen(false)}
      >
        <HiXMark className="size-5" />
      </button>

      <div className="h-full flex flex-col">
        <div className="border-b border-border p-6">
          <Logo />
        </div>

        <nav className="overflow-y-auto p-4 flex-1">
          <div className="mb-6">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Shop by sport
            </p>

            {sportsData.map((sport) => (
              <Link
                to={sport.path}
                key={sport.name}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl p-3 text-base font-medium hover:bg-muted"
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
                onClick={() => setIsMenuOpen(false)}
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block rounded-xl p-3
                  ${isActive ? "bg-muted font-semibold" : "hover:bg-muted"}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="border-t border-border p-4">
          <Link
            to="/login"
            className=" flex justify-center items-center h-12 bg-foreground rounded-full text-sm font-semibold text-background"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
