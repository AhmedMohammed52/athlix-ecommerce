import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ProfileForm from "./ProfileForm";
import { useAuth } from "../../../context/AuthContext";
import { updateProfile } from "../../../services/apiProfiles";

export default function Profile() {
  const { user, profile, refreshProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!profile || !user) return;

    setFormData({
      firstName: profile.first_name ?? "",
      lastName: profile.last_name ?? "",
      email: user.email ?? "",
      phone: profile.phone ?? "",
    });
  }, [profile, user]);

  useEffect(() => {
    if (!isEditing) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isEditing]);

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

  function resetForm() {
    if (!profile || !user) return;

    setFormData({
      firstName: profile.first_name ?? "",
      lastName: profile.last_name ?? "",
      email: user.email ?? "",
      phone: profile.phone ?? "",
    });
  }

  function handleEdit() {
    resetForm();
    setIsEditing(true);
  }

  function handleCancel() {
    if (isSaving) return;

    resetForm();
    setIsEditing(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!hasChanges) return;

    try {
      setIsSaving(true);

      await updateProfile(formData);

      await refreshProfile();

      setIsEditing(false);

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <div className="rounded-3xl border border-border p-6 md:p-8">
        <h2 className="font-display text-2xl font-bold">Profile</h2>

        <ProfileForm
          formData={formData}
          handleChange={handleChange}
          isEditing={false}
        />

        <button
          type="button"
          onClick={handleEdit}
          className="
            btn-shine
            mt-8
            inline-flex
            h-12
            items-center
            rounded-full
            bg-foreground
            px-6
            text-sm
            font-semibold
            text-background
          "
        >
          Edit Information
        </button>
      </div>

      {isEditing && (
        <div
          className="
            fixed inset-0 z-100
            flex items-center justify-center
            bg-black/60
            p-4
            backdrop-blur-sm
          "
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !isSaving) {
              handleCancel();
            }
          }}
        >
          <div
            className="
              relative
              flex
              max-h-[90vh]
              w-full
              max-w-xl
              flex-col
              overflow-hidden
              rounded-3xl
              border
              border-border
              bg-background
              shadow-2xl
              animate-in
              fade-in
              zoom-in-95
              duration-200
            "
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div
              className="
                shrink-0
                border-b
                border-border
                px-6
                py-5
                md:px-7
              "
            >
              <div className="flex items-start justify-between gap-5">
                <div className="min-w-0">
                  <p
                    className="
                      text-[11px]
                      font-medium
                      uppercase
                      tracking-[0.18em]
                      text-muted-foreground
                    "
                  >
                    Edit profile
                  </p>

                  <h2
                    className="
                      mt-1.5
                      font-display
                      text-2xl
                      font-bold
                    "
                  >
                    Update your information
                  </h2>

                  <p
                    className="
                      mt-1.5
                      max-w-md
                      text-xs
                      leading-5
                      text-muted-foreground
                    "
                  >
                    Update your personal information and keep your profile up to
                    date.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  aria-label="Close"
                  className="
                    flex
                    size-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-border
                    text-lg
                    text-muted-foreground
                    transition
                    hover:bg-muted
                    hover:text-foreground
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  ×
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <form
                onSubmit={handleSubmit}
                className="
                  px-6
                  py-6
                  md:px-7
                  md:py-7
                "
              >
                <div
                  className="
                    mb-6
                    rounded-2xl
                    border
                    border-border
                    bg-muted/30
                    px-4
                    py-3
                  "
                >
                  <p className="text-sm font-medium">
                    You are editing your profile
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-muted-foreground
                    "
                  >
                    Make your changes and save them when you're ready.
                  </p>
                </div>

                <ProfileForm
                  formData={formData}
                  handleChange={handleChange}
                  isEditing={true}
                />

                <div
                  className="
                    mt-7
                    flex
                    flex-col-reverse
                    gap-3
                    border-t
                    border-border
                    pt-6
                    sm:flex-row
                    sm:justify-end
                  "
                >
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="
                      h-11
                      rounded-full
                      border
                      border-border
                      bg-background
                      px-6
                      text-sm
                      font-medium
                      text-foreground
                      transition
                      hover:bg-muted
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={!hasChanges || isSaving}
                    className="
                      btn-shine
                      inline-flex
                      h-11
                      items-center
                      justify-center
                      rounded-full
                      bg-foreground
                      px-7
                      text-sm
                      font-semibold
                      text-background
                      transition
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
