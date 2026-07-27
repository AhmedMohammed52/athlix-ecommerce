import FormInput from "../../ui/FormInput";

export default function SecurityInputGroup() {
  return (
    <>
      <FormInput
        label="Current password"
        id="currentPassword"
        type="password"
        placeholder="*************"
      />

      <FormInput
        label="New password"
        id="newPassword"
        type="password"
        placeholder="*************"
      />

      <FormInput
        label="Confirm password"
        id="confirmPassword"
        type="password"
        placeholder="*************"
      />
    </>
  );
}
