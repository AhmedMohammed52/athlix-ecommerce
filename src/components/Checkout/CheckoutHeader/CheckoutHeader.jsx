import CheckoutSteps from "./CheckoutSteps";

export default function CheckoutHeader({ currentStep }) {
  return (
    <>
      <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
        Checkout
      </h1>

      <CheckoutSteps currentStep={currentStep} />
    </>
  );
}
