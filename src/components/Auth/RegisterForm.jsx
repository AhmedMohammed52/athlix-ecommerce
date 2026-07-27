import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import PasswordInput from "../ui/PasswordInput";
import EmailInput from "../ui/EmailInput";
import PrimaryButton from "../ui/PrimaryButton";
import FormLabel from "../ui/FormLabel";
import TextField from "../ui/TextField";

export default function RegisterForm({
  onSubmit,
  register,
  errors,
  isLoading,
}) {
  return (
    <form className="space-y-4" onSubmit={onSubmit} noValidate>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <FormLabel id={"fname"} label={"First Name"} />

          <TextField register={register} id={"fname"} name={"firstName"} />

          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <FormLabel id={"lname"} label={"Last Name"} />

          <TextField register={register} id={"lname"} name={"lastName"} />

          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <EmailInput register={register} errors={errors} />

      <PasswordInput
        id="password"
        placeholder="At least 8 characters"
        label="Password"
        register={register}
        name="password"
        errors={errors}
      >
        <div className="mt-2 flex gap-1">
          <span className="h-1 flex-1 rounded-full transition bg-muted"></span>
          <span className="h-1 flex-1 rounded-full transition bg-muted"></span>
          <span className="h-1 flex-1 rounded-full transition bg-muted"></span>
        </div>
      </PasswordInput>

      <label className="flex items-center gap-2 text-[13px] text-muted-foreground">
        <input
          type="checkbox"
          {...register("terms")}
          className="size-4 rounded border-border"
        />
        <span>
          I agree to the{" "}
          <Link
            className="font-medium text-foreground underline-offset-2 hover:underline"
            to="/"
          >
            terms{" "}
          </Link>
          and{" "}
          <Link
            className="font-medium text-foreground underline-offset-2 hover:underline"
            to="/"
          >
            Privacy Policy
          </Link>
        </span>
      </label>

      {errors.terms && (
        <p className="text-xs text-red-500 mt-1">{errors.terms.message}</p>
      )}

      <PrimaryButton
        text={isLoading ? "Creating account..." : "Create account"}
        icon={FiUser}
        disabled={isLoading}
      />
    </form>
  );
}
