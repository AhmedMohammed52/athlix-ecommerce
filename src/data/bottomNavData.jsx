import { FiHome, FiUser } from "react-icons/fi";
import { RiStore2Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa6";
import { LuShoppingBag } from "react-icons/lu";

const bottomNavData = [
  {
    name: "Home",
    path: "/",
    icon: <FiHome className="size-5" />,
  },
  {
    name: "Shop",
    path: "/shop",
    icon: <RiStore2Line className="size-5" />,
  },
  {
    name: "Saved",
    path: "/wishlist",
    icon: <FaRegHeart className="size-5" />,
  },
  {
    name: "Bag",
    path: "/bag",
    icon: <LuShoppingBag className="size-5" />,
  },
  {
    name: "Me",
    path: "/profile",
    icon: <FiUser className="size-5" />,
  },
];

export default bottomNavData;
