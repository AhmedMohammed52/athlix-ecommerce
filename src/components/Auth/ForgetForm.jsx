import EmailInput from "../ui/EmailInput";
import PrimaryButton from "../ui/PrimaryButton";

export default function ForgetForm({ onSubmit, errors, register }) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <EmailInput register={register} errors={errors} />

      <PrimaryButton text={"Send Reset Link"} />
    </form>
  );
}
