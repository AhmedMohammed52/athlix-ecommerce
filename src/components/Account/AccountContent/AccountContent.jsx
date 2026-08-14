import Orders from "../Orders/Orders";
import Wishlist from "../Wishlist/Wishlist";
import Profile from "../Profile/Profile";
import Addresses from "../Addresses/Addresses";
import Notifications from "../Notifications/Notifications";
import Security from "../Security/Security";
import Settings from "../SettingsSection/Settings";

const tabs = {
  orders: Orders,
  wishlist: Wishlist,
  profile: Profile,
  addresses: Addresses,
  notifications: Notifications,
  security: Security,
  settings: Settings,
};

export default function AccountContent({
  activeTab,
  orders,
  isLoadingOrders,
  ordersError,
}) {
  const ActiveComponent = tabs[activeTab] || Orders;

  if (activeTab === "orders") {
    return (
      <div className="animate-fade-in">
        <Orders
          orders={orders}
          isLoading={isLoadingOrders}
          error={ordersError}
        />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <ActiveComponent />
    </div>
  );
}
