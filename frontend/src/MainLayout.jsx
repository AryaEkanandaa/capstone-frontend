import { useState } from "react";
import Sidebar from "./components/SideBar";
import Navbar from "./components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const { pathname } = useLocation();
  const isChatbot = pathname.startsWith("/chatbot");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 📱 MOBILE SIDEBAR (overlay) */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="relative w-64 h-full">
          <Sidebar />
        </div>
      </div>

      {/* 💻 DESKTOP SIDEBAR */}
      <aside className="hidden md:block">
        <Sidebar />
      </aside>

      {/* ✅ RIGHT SIDE */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* 🧭 Navbar */}
        {!isChatbot && (
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
        )}

        {/* 🔥 Content */}
        {isChatbot ? (
          <div className="flex-1 overflow-hidden">
            <Outlet />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
            <div className="max-w-7xl mx-auto w-full">
              <Outlet />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
