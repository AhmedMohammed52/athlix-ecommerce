import { useState } from "react";
import SwitchBtn from "../../ui/SwitchBtn";

export default function NotificationItem({ item }) {
  const [enabled, setEnabled] = useState(item.enabled);

  return (
    <div className="flex items-center justify-between rounded-xl bg-muted/40 px-4 py-3">
      <span className="text-sm">{item.title}</span>

      <SwitchBtn checked={enabled} onChange={setEnabled} />
    </div>
  );
}
