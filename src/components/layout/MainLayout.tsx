import type { ReactNode } from "react";
import type { PageName } from "../../App";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
  activePage: PageName;
  onNavigate: (page: PageName) => void;
}

export default function MainLayout({
  children,
  activePage,
  onNavigate,
}: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#080605] text-[#f5eadb]">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <main className="min-w-0 flex-1 px-10 py-9 lg:px-16">
        <div className="mx-auto w-full max-w-[960px]">{children}</div>
      </main>
    </div>
  );
}
