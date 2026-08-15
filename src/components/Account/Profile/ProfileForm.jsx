import FormInput from "../../ui/FormInput";

export default function ProfileForm({ formData, handleChange, isEditing }) {
  return (
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      <FormInput
        label="First name"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        readOnly={!isEditing}
        autoComplete="given-name"
        placeholder="First name"
      />

      <FormInput
        label="Last name"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        readOnly={!isEditing}
        autoComplete="family-name"
        placeholder="Last name"
      />

      <FormInput
        label="Email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        readOnly
        autoComplete="email"
      />

      <FormInput
        label="Phone"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        readOnly={!isEditing}
        autoComplete="tel"
        placeholder="+20 1234567890"
      />
    </div>
  );
}
