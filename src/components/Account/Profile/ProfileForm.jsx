import FormInput from "../../ui/FormInput";

export default function ProfileForm({ formData, handleChange, isEditing }) {
  return (
    <div className=" mt-6 grid gap-4 sm:grid-cols-2">
      <FormInput
        label="First name"
        id="fname"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        readOnly={!isEditing}
      />

      <FormInput
        label="Last name"
        id="lname"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        readOnly={!isEditing}
      />

      <FormInput
        label="Email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        readOnly
      />

      <FormInput
        label="Phone"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+20 1234567890"
        readOnly={!isEditing}
      />
    </div>
  );
}
