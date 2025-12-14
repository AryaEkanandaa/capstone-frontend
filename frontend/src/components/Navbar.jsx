import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Navbar({ onMenuClick }) {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("dashboard")) return "Dashboard";
    return "PrediX AI";
  };

  return (
    <div className="
      relative z-40
      w-full bg-white border-b h-16
      flex items-center justify-between
      px-4 sm:px-6
    ">
      {/* ☰ HAMBURGER — MOBILE */}
      <button
        className="md:hidden pointer-events-auto"
        onClick={onMenuClick}
      >
        <Menu size={24} />
      </button>

      <h2 className="text-lg sm:text-xl font-semibold">
        {getPageTitle()}
      </h2>

      {/* spacer */}
      <div className="w-6" />
    </div>
  );
}

