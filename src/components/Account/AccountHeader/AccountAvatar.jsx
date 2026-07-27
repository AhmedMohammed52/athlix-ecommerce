import { useAuth } from "../../../context/AuthContext";

export default function AccountAvatar() {
  const { profile } = useAuth();

  const initials = `${profile?.first_name?.[0] ?? ""}${profile?.last_name?.[0] ?? ""}`;

  return (
    <div className="size-14 rounded-full bg-foreground flex items-center justify-center font-display text-lg font-bold text-background">
      {initials}
    </div>
  );
}
