import type { PageName } from "../../App";

interface SidebarProps {
  activePage: PageName;
  onNavigate: (page: PageName) => void;
}

const menuItems: Array<{
  id: PageName;
  label: string;
  description: string;
  icon: "search" | "database";
}> = [
  {
    id: "characters",
    label: "캐릭터 조회",
    description: "API 캐릭터 검색",
    icon: "search",
  },
  {
    id: "adventures",
    label: "저장된 모험단",
    description: "등록 캐릭터 관리",
    icon: "database",
  },
];

function MenuIcon({ type }: { type: "search" | "database" }) {
  if (type === "search") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  );
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="sticky top-0 h-screen w-[252px] shrink-0 border-r border-[#3f281f] bg-[#160e0b]">
      <div className="flex h-[68px] items-center gap-3 border-b border-[#302019] px-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#df352c] text-base font-bold text-white shadow-[0_4px_14px_rgba(223,53,44,0.25)]">
          D
        </div>
        <div>
          <p className="text-sm font-semibold text-[#d6a341]">던파 레이드</p>
          <p className="mt-1 font-mono text-[9px] tracking-[0.08em] text-[#987a69]">
            DNF · Neople OpenAPI
          </p>
        </div>
      </div>

      <nav className="px-2 py-4" aria-label="레이드 관리">
        <p className="mb-2 px-3 text-[10px] font-semibold tracking-[0.16em] text-[#6f574c]">
          레이드 관리
        </p>
        <div className="space-y-1">
          {menuItems.map((item) => {
            const active = item.id === activePage;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={active ? "page" : undefined}
                className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
                  active
                    ? "bg-[#3a1713] text-[#f0dfd1] shadow-[inset_2px_0_0_#e23a2f]"
                    : "text-[#aa8c7c] hover:bg-[#21130f] hover:text-[#dfc9ba]"
                }`}
              >
                <span className={active ? "text-[#e23a2f]" : "text-[#8c7264]"}>
                  <MenuIcon type={item.icon} />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{item.label}</span>
                  <span className="mt-0.5 block text-[10px] text-[#80675b]">
                    {item.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
