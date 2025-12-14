import { useState } from "react";
import Sidebar from "./components/SideBar";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ================= MOBILE MAIN SIDEBAR ================= */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />

          {/* sidebar */}
          <div className="relative w-64 h-full bg-[#111827]">
            <Sidebar />
          </div>
        </div>
      )}

      {/* ================= DESKTOP MAIN SIDEBAR ================= */}
      <aside className="hidden md:block">
        <Sidebar />
      </aside>

      {/* ================= RIGHT SIDE ================= */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* NAVBAR — SELALU ADA */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        {/* CONTENT */}
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
