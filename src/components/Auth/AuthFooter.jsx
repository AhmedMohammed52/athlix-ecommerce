import { Link } from "react-router-dom";

export default function AuthFooter({ text, link, to }) {
  return (
    <p className="mt-6 text-center text-sm text-muted-foreground">
      {text}{" "}
      <Link className="font-semibold text-foreground story-link" to={to}>
        {link}
      </Link>
    </p>
  );
}
