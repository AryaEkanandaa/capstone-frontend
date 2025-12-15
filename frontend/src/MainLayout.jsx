import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/SideBar";
import Navbar from "./components/Navbar";

export default function MainLayout() {
  const [mainSidebarOpen, setMainSidebarOpen] = useState(false);
  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);

  const { pathname } = useLocation();
  const isChatbot = pathname.startsWith("/chatbot");

  return (
    <div className="flex min-h-screen bg-gray-100">

      {mainSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMainSidebarOpen(false)}
          />
          <div className="relative w-64 h-full bg-[#111827]">
            <Sidebar />
          </div>
        </div>
      )}

      <aside className="hidden md:block">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">

        {!isChatbot && (
          <Navbar
            onMenuClick={() => setMainSidebarOpen(true)}
          />
        )}

        {isChatbot && (
          <Navbar
            onMenuClick={() => setMainSidebarOpen(true)}
            onChatClick={() => setChatSidebarOpen(true)}
          />
        )}

        <div className="flex-1 overflow-hidden">
          <Outlet
            context={{
              chatSidebarOpen,
              setChatSidebarOpen,
            }}
          />
        </div>
      </div>
    </div>
  );
}
