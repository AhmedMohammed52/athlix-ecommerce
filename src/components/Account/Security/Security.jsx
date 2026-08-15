import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import SecurityInputGroup from "./SecurityInputGroup";
import TwoFactorCard from "./TwoFactorCard";

import { securitySchema } from "../../../validation/securitySchema";
import { updatePassword } from "../../../services/apiSecurity";

const initialForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function Security() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(securitySchema),
    defaultValues: initialForm,
    mode: "onChange",
  });

  async function onSubmit(data) {
    try {
      await updatePassword(data.currentPassword, data.newPassword);

      toast.success("Password updated successfully.");

      reset(initialForm);
    } catch (error) {
      toast.error(error.message || "Failed to update password.");
    }
  }

  return (
    <div className="space-y-4 rounded-3xl border border-border p-6 md:p-8">
      <div>
        <h2 className="font-display text-2xl font-bold">Security</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your password and account security.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <SecurityInputGroup
          register={register}
          errors={errors}
          isSaving={isSubmitting}
        />

        <div className="mt-5 rounded-2xl border border-border bg-muted/20 px-4 py-4">
          <p className="text-xs font-medium">Password requirements</p>

          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>• At least 8 characters</li>
            <li>• At least one uppercase letter</li>
            <li>• At least one lowercase letter</li>
            <li>• At least one number</li>
            <li>• At least one special character</li>
          </ul>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-shine inline-flex h-12 items-center rounded-full bg-foreground px-6 text-sm font-semibold text-background transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update password"}
          </button>
        </div>
      </form>

      <TwoFactorCard />
    </div>
  );
}
