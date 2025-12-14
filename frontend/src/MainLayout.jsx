import Sidebar from "./components/SideBar";
import Navbar from "./components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const { pathname } = useLocation();
  const isChatbot = pathname.startsWith("/chatbot");

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🌐 GLOBAL SIDEBAR */}
      <aside className="hidden md:block">
        <Sidebar />
      </aside>

      {/* ✅ RIGHT SIDE */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* 🧭 Navbar */}
        {!isChatbot && <Navbar />}

        {/* 🔥 Content */}
        {isChatbot ? (
          // CHATBOT — full height
          <div className="flex-1 overflow-hidden">
            <Outlet />
          </div>
        ) : (
          // OTHER PAGES — responsive padding
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
