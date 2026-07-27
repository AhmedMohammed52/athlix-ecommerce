export default function FormLabel({ id, label }) {
  return (
    <label
      htmlFor={id}
      className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1.5 text-xs"
    >
      {label}
    </label>
  );
}
