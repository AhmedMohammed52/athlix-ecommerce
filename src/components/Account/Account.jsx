import { useState } from "react";
import AccountContent from "./AccountContent/AccountContent";
import AccountHeader from "./AccountHeader/AccountHeader";
import AccountSidebar from "./AccountSidebar/AccountSidebar";

export default function Account() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className=" container-athlix py-10 md:py-14">
      <AccountHeader />

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <AccountContent activeTab={activeTab} />
      </div>
    </div>
  );
}
