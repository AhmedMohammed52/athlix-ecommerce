import SecurityPasswordInput from "./SecurityPasswordInput";

export default function SecurityInputGroup({ register, errors, isSaving }) {
  return (
    <div className="grid gap-5">
      <SecurityPasswordInput
        id="currentPassword"
        label="Current password"
        placeholder="Enter your current password"
        autoComplete="current-password"
        register={register}
        error={errors.currentPassword?.message}
        disabled={isSaving}
      />

      <SecurityPasswordInput
        id="newPassword"
        label="New password"
        placeholder="Enter your new password"
        autoComplete="new-password"
        register={register}
        error={errors.newPassword?.message}
        disabled={isSaving}
      />

      <SecurityPasswordInput
        id="confirmPassword"
        label="Confirm new password"
        placeholder="Confirm your new password"
        autoComplete="new-password"
        register={register}
        error={errors.confirmPassword?.message}
        disabled={isSaving}
      />
    </div>
  );
}
