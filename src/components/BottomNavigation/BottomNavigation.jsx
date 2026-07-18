import { NavLink } from "react-router-dom";
import bottomNavData from "../../data/bottomNavData";
import { useEffect, useState } from "react";

export default function BottomNavigation() {
  const [showBottomNav, setShowBottomNav] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 20) {
        setShowBottomNav(true);
      } else {
        setShowBottomNav(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={` lg:hidden fixed inset-x-0 bottom-0 z-40 bg-background/95 border-t border-border backdrop-blur-xl pb-[env(safe-area-inset-bottom)] transition-transform duration-300
    ${showBottomNav ? "translate-y-0" : "translate-y-full"}
    `}
    >
      <ul className="flex justify-around items-center px-2">
        {bottomNavData.map((link) => (
          <li className="flex-1" key={link.name}>
            <NavLink
              className={({
                isActive,
              }) => `relative flex flex-col items-center gap-1 py-2.5 text-[11px] transition 
                ${
                  isActive
                    ? "active font-bold text-foreground after:absolute after:top-0 after:inset-x-6 after:h-0.5 after:bg-foreground after:rounded-full"
                    : "font-medium text-muted-foreground"
                }
                `}
              to={link.path}
            >
              <span className=" relative">{link.icon}</span>

              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
