import { NavLink } from "react-router-dom";

import navLinks from "./navbarData";

import MegaMenu from "./MegaMenu";

export default function DesktopNav() {
  return (
    <nav className="hidden md:flex flex-1 items-center gap-1">
      {navLinks.map((link) => (
        <div className="relative group" key={link.path}>
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              `inline-flex items-center h-10 rounded-full px-4 font-medium text-sm transition
                ${
                  isActive
                    ? "text-foreground active"
                    : "text-foreground/80 hover:text-foreground"
                }`
            }
          >
            {link.name}
          </NavLink>

          {link.categories && <MegaMenu />}
        </div>
      ))}
    </nav>
  );
}
