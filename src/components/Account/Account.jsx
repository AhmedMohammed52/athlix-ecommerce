import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../../context/AuthContext";
import { getAccountOrders } from "../../services/accountService";

import AccountContent from "./AccountContent/AccountContent";
import AccountHeader from "./AccountHeader/AccountHeader";
import AccountSidebar from "./AccountSidebar/AccountSidebar";

export default function Account() {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("orders");

  const {
    data: orders = [],
    isLoading: isLoadingOrders,
    error: ordersError,
  } = useQuery({
    queryKey: ["account-orders", user?.id],
    queryFn: getAccountOrders,
    enabled: !!user,
  });

  return (
    <div className="container-athlix py-10 md:py-14">
      <AccountHeader orderCount={orders.length} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <AccountContent
          activeTab={activeTab}
          orders={orders}
          isLoadingOrders={isLoadingOrders}
          ordersError={ordersError}
        />
      </div>
    </div>
  );
}
