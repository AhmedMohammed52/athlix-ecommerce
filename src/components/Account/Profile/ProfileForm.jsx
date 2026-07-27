import FormInput from "../../ui/FormInput";

export default function ProfileForm() {
  return (
    <div className=" mt-6 grid gap-4 sm:grid-cols-2">
      <FormInput
        label="First name"
        id="fname"
        type="text"
        placeholder="Your Name"
      />

      <FormInput
        label="Last name"
        id="lname"
        type="text"
        placeholder="Your Last Name"
      />

      <FormInput
        label="Email"
        id="email"
        type="email"
        placeholder="example@.com"
      />

      <FormInput
        label="Phone"
        id="phone"
        type="phone"
        placeholder="+20 1234567890"
      />
    </div>
  );
}
