import type { ReactNode } from "react";

type SideNavButtonProps = {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function SideNavButton({ isActive, onClick, children }: SideNavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-sm font-medium transition-colors ${
        isActive
          ? "bg-gray-800 text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}
