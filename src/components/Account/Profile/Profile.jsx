import ProfileForm from "./ProfileForm";

export default function Profile() {
  return (
    <div className=" border border-border p-6 md:p-8 rounded-3xl">
      <h2 className=" font-display font-bold text-2xl">Profile</h2>

      <ProfileForm />

      <button className="btn-shine mt-8 h-12 inline-flex items-center bg-foreground text-background rounded-full text-sm font-semibold px-6">
        Save changes
      </button>
    </div>
  );
}
