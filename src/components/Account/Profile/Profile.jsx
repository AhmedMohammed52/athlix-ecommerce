import { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import { useAuth } from "../../../context/AuthContext";
import { updateProfile } from "../../../services/apiProfiles";
import toast from "react-hot-toast";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, profile, refreshProfile } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!profile || !user) return;

    setFormData({
      firstName: profile.first_name ?? "",
      lastName: profile.last_name ?? "",
      email: user.email ?? "",
      phone: profile.phone ?? "",
    });
  }, [profile, user]);

  const hasChanges =
    formData.firstName !== (profile?.first_name ?? "") ||
    formData.lastName !== (profile?.last_name ?? "") ||
    formData.phone !== (profile?.phone ?? "");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCancel() {
    if (!profile || !user) return;

    setFormData({
      firstName: profile.first_name ?? "",
      lastName: profile.last_name ?? "",
      email: user.email ?? "",
      phone: profile.phone ?? "",
    });

    setIsEditing(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsSaving(true);

      await updateProfile(formData);

      await refreshProfile();

      setIsEditing(false);

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className=" border border-border p-6 md:p-8 rounded-3xl">
      <h2 className=" font-display font-bold text-2xl">Profile</h2>

      {isEditing && (
        <div className="mt-4 mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 animate-scale-in">
          You are editing your Information. Don't forget to save your changes.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <ProfileForm
          formData={formData}
          handleChange={handleChange}
          isEditing={isEditing}
        />

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="btn-shine mt-8 h-12 inline-flex items-center bg-foreground text-background rounded-full text-sm font-semibold px-6"
          >
            Edit Information
          </button>
        ) : (
          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              disabled={!hasChanges || isSaving}
              className="btn-shine h-12 inline-flex items-center bg-foreground text-background rounded-full text-sm font-semibold px-6"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              disabled={isSaving}
              onClick={handleCancel}
              className="h-12 rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
