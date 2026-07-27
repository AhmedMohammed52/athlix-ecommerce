import { useAuth } from "../../../context/AuthContext";

export default function UserWelcome() {
  const { profile } = useAuth();
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-widest text-royal">
        Member since 2024
      </p>

      <h2 className=" font-bold font-display text-2xl md:text-3xl tracking-tight">
        Welcome back, {profile?.first_name ?? ""}
      </h2>
    </div>
  );
}
