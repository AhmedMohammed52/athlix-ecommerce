import {
  LuPackage,
  LuHeart,
  LuUser,
  LuMapPin,
  LuBell,
  LuLock,
  LuSettings,
} from "react-icons/lu";

const accountSidebarLinks = [
  {
    id: "orders",
    label: "Orders",
    icon: <LuPackage className="size-4" />,
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: <LuHeart className="size-4" />,
  },
  {
    id: "profile",
    label: "Profile",
    icon: <LuUser className="size-4" />,
  },
  {
    id: "addresses",
    label: "Addresses",
    icon: <LuMapPin className="size-4" />,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <LuBell className="size-4" />,
  },
  {
    id: "security",
    label: "Security",
    icon: <LuLock className="size-4" />,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <LuSettings className="size-4" />,
  },
];

export default accountSidebarLinks;
