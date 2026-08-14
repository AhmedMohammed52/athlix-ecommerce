import { useAuth } from "../../../context/AuthContext";

export default function UserWelcome() {
  const { user, profile } = useAuth();

  const memberSince = user?.created_at
    ? new Date(user.created_at).getFullYear()
    : "";

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-royal">
        Member since {memberSince}
      </p>

      <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
        Welcome back, {profile?.first_name ?? ""}
      </h2>
    </div>
  );
}
