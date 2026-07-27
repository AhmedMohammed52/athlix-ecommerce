import { FiMail } from "react-icons/fi";
import FormLabel from "./FormLabel";

export default function AuthInput({ register, errors }) {
  return (
    <div>
      <FormLabel id={"email"} label={"Email"} />

      <div className="relative">
        <FiMail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <input
          {...register("email")}
          type="email"
          id="email"
          className="flex w-full border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 rounded-xl pl-11"
          placeholder="you@example.com"
        />
      </div>

      {errors.email && (
        <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
      )}
    </div>
  );
}
