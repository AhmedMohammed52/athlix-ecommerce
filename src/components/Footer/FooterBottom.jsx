import { Link } from "react-router-dom";
import socialLinksData from "../../data/socialLinksData";

export default function FooterBottom() {
  return (
    <div className="mt-6">
      <div className="h-px w-full rounded-full bg-linear-to-r from-transparent via-background/40 to-transparent" />

      <div className="flex justify-center gap-3 pt-6">
        {socialLinksData.map((link) => (
          <Link
            key={link.platformName}
            to={link.path}
            aria-label={link.platformName}
            className="flex size-10 items-center justify-center rounded-full border border-background/15 transition hover:border-background/50 hover:bg-background/10"
          >
            {link.icon}
          </Link>
        ))}
      </div>

      <p className="mt-5 text-xs text-background/50">
        © {new Date().getFullYear()} ATHLIX. All rights reserved.
      </p>
    </div>
  );
}
