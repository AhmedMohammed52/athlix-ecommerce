import accountSidebarLinks from "../../../data/accountSidebarLinks";

export default function AccountSidebar({ activeTab, setActiveTab }) {
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
    </nav>
  );
}
