import SwitchBtn from "../../ui/SwitchBtn";

export default function TwoFactorCard() {
  return (
    <div className="flex items-center justify-between rounded-xl bg-muted/40 px-4 py-3">
      <div>
        <p className=" text-sm font-semibold">Two-factor authentication</p>

        <p className=" text-xs text-muted-foreground">
          Add an extra layer of security
        </p>
      </div>

      <SwitchBtn />
    </div>
  );
}
