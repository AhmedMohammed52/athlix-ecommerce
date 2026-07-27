import { useNavigate } from "react-router-dom";
import accountSidebarLinks from "../../../data/accountSidebarLinks";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

export default function AccountSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();

    toast.success("Logged out successfully");

    navigate("/login");
  }

  return (
    <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
      {accountSidebarLinks.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`inline-flex h-11 shrink-0 items-center gap-3 rounded-full px-4 text-sm font-medium transition lg:h-12 lg:justify-start
            ${
              activeTab === item.id
                ? "bg-foreground text-background active"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }
        `}
        >
          {item.icon}
          {item.label}
        </button>
      ))}

      <button
        className="inline-flex h-11 shrink-0 items-center gap-3 rounded-full px-4 text-sm font-medium transition lg:h-12 lg:justify-start text-red-600 hover:bg-red-50"
        onClick={handleLogout}
      >
        <FiLogOut className="size-4" />
        Log Out
      </button>
    </nav>
  );
}
