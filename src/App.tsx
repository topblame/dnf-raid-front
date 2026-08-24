import { useState } from "react";
import MainLayout from "./components/layout/MainLayout";
import CharacterPage from "./pages/CharacterPage";
import AdventurePage from "./pages/AdventurePage";

export type PageName = "characters" | "adventures";

function App() {
  const [activePage, setActivePage] = useState<PageName>("characters");

  return (
    <MainLayout activePage={activePage} onNavigate={setActivePage}>
      {activePage === "characters" ? <CharacterPage /> : <AdventurePage />}
    </MainLayout>
  );
}

export default App;
