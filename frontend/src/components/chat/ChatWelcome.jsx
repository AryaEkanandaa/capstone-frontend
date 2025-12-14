import QuickActionCard from "./QuickActionCard";
import LogoPredix from "../../assets/logo.png";

export default function ChatWelcome({ userName, quickActions, setInput }) {
  return (
    <div className="w-full flex flex-col items-center px-4 py-8">
      <div className="max-w-3xl w-full space-y-6">

        {/* LOGO */}
        <img
          src={LogoPredix}
          alt="PrediX Logo"
          className="
            mx-auto
            w-24 h-24
            sm:w-28 sm:h-28
            object-contain
          "
        />

        {/* TITLE */}
        <div className="text-center space-y-2">
          <h1
            className="
              text-3xl sm:text-4xl
              font-bold
              bg-gradient-to-r from-indigo-600 to-purple-600
              text-transparent bg-clip-text
            "
          >
            Hai, {userName}
          </h1>

          <p className="text-base sm:text-lg text-gray-600">
            Saya siap membantu Anda mengelola dan menganalisis sistem mesin
          </p>
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="pt-4">

          {/* MOBILE — horizontal scroll */}
          <div className="flex sm:hidden gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {quickActions.map((action, i) => (
              <div
                key={i}
                className="min-w-[260px] flex-shrink-0"
              >
                <QuickActionCard
                  {...action}
                  setInput={setInput}
                />
              </div>
            ))}
          </div>

          {/* TABLET & DESKTOP — grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, i) => (
              <QuickActionCard
                key={i}
                {...action}
                setInput={setInput}
              />
            ))}
          </div>

        </div>

        {/* FOOTNOTE */}
        <p className="text-center text-sm text-gray-500 pt-6">
          Atau ketik pertanyaan Anda di bawah untuk memulai percakapan
        </p>

      </div>
    </div>
  );
}
