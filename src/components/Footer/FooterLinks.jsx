import { Link } from "react-router-dom";
import footerLinksData from "../../data/footerLinksData";

export default function FooterLinks() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {footerLinksData.map((block) => (
        <div key={block.title}>
          <div className="mb-4 relative">
            <p className="font-bold text-background/60 uppercase tracking-widest text-xs">
              {block.title}
            </p>

            <div className=" absolute top-2 right-0 w-[75%] h-px bg-linear-to-r from-background/20 via-background/60 to-background/20 rounded-full md:hidden"></div>
          </div>

          <ul className="space-y-3">
            {block.links.map((link) => (
              <li key={link}>
                <Link
                  className="text-sm text-background/80 transition hover:text-background"
                  to="/shop"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
