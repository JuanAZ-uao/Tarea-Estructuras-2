import { useState } from "react";
import type { MenuNode } from "../tree/MenuTree";
import "./Sidebar.css";

interface MenuItemProps {
  node: MenuNode;
  activeLink: string;
  onSelect: (node: MenuNode) => void;
  depth: number;
}

function MenuItem({ node, activeLink, onSelect, depth }: MenuItemProps) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children.length > 0;
  const isActive = activeLink === node.link;

  const handleClick = () => {
    if (hasChildren) {
      setExpanded(!expanded);
    }
    onSelect(node);
  };

  return (
    <li>
      <button
        className={`menu-item ${isActive ? "active" : ""}`}
        style={{ paddingLeft: `${16 + depth * 16}px` }}
        onClick={handleClick}
      >
        <span className="menu-title">{node.title}</span>
        {hasChildren && (
          <span className={`arrow ${expanded ? "open" : ""}`}>&#9656;</span>
        )}
      </button>
      {hasChildren && expanded && (
        <ul className="submenu">
          {node.children.map((child) => (
            <MenuItem
              key={child.link}
              node={child}
              activeLink={activeLink}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

interface SidebarProps {
  menuItems: MenuNode[];
  activeLink: string;
  onSelect: (node: MenuNode) => void;
}

export default function Sidebar({ menuItems, activeLink, onSelect }: SidebarProps) {
  return (
    <nav className="sidebar">
      <ul className="menu-list">
        {menuItems.map((node) => (
          <MenuItem
            key={node.link}
            node={node}
            activeLink={activeLink}
            onSelect={onSelect}
            depth={0}
          />
        ))}
      </ul>
    </nav>
  );
}
