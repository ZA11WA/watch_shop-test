// AdminNavItem.js
import React from "react";

interface AdminNavItemProps {
  selected?: boolean;
  label: string;
  onClick?: () => void;
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({
  selected,
  label,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-gray-700 dark:text-white transition cursor-pointer
        ${
          selected
            ? "border-b-stone-800 text-black"
            : "border-transparent text-neutral-600"
        }
        `}
    >
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
};

export default AdminNavItem;
