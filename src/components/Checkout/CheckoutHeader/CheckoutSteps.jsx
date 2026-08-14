import { GoCheck } from "react-icons/go";

const steps = [
  { number: 1, label: "Shipping" },
  { number: 2, label: "Payment" },
  { number: 3, label: "Review" },
];

export default function CheckoutSteps({ currentStep }) {
  return (
    <ol className="mt-8 flex items-center gap-4">
      {steps.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;
        const isUpcoming = step.number > currentStep;

        return (
          <li key={step.number} className="flex items-center gap-3">
            <span
              className={`
                grid size-9 place-items-center rounded-full border text-sm font-semibold transition
                ${
                  isCompleted
                    ? "border-foreground bg-foreground text-background"
                    : isActive
                      ? "border-foreground"
                      : "border-border text-muted-foreground"
                }
              `}
            >
              {isCompleted ? <GoCheck className="size-4" /> : step.number}
            </span>

            <span
              className={`
                text-sm font-medium
                ${isUpcoming ? "text-muted-foreground" : "text-foreground"}
              `}
            >
              {step.label}
            </span>

            {index < steps.length - 1 && (
              <span className="hidden h-px w-12 bg-border sm:inline-block" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
