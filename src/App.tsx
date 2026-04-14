import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { buildMenuTree } from "./tree/menuData";
import type { MenuNode } from "./tree/MenuTree";
import { InicioPage } from "./pages/Pages";

const menuTree = buildMenuTree();

function App() {
  const [activeLink, setActiveLink] = useState("/inicio");
  const [ActivePage, setActivePage] = useState<React.FC>(() => InicioPage);

  const handleSelect = (node: MenuNode) => {
    setActiveLink(node.link);
    setActivePage(() => node.component);
  };

  return (
    <div className="app-layout">
      <Sidebar
        menuItems={menuTree.root}
        activeLink={activeLink}
        onSelect={handleSelect}
      />
      <main className="content">
        <ActivePage />
      </main>
    </div>
  );
}

export default App;
