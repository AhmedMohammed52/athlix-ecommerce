import { FiMapPin } from "react-icons/fi";
import { LuPackage, LuTruck } from "react-icons/lu";

export default function OrderInfo({ order }) {
  return (
    <div className="space-y-4 rounded-3xl border border-border p-6 text-sm">
      <div className="flex gap-3">
        <FiMapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Shipping address
          </p>

          <p className="mt-0.5 font-medium">
            {order.address}, {order.city}, {order.postal_code}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <LuTruck className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Tracking
          </p>

          <p className="mt-0.5 font-medium">
            Tracking will be available after shipment.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <LuPackage className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Status
          </p>

          <p className="mt-0.5 font-medium capitalize">{order.status}</p>
        </div>
      </div>
    </div>
  );
}
