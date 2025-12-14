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

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {quickActions.map((action, i) => (
            <QuickActionCard
              key={i}
              {...action}
              setInput={setInput}
            />
          ))}
        </div>

        {/* FOOTNOTE */}
        <p className="text-center text-sm text-gray-500 pt-6">
          Atau ketik pertanyaan Anda di bawah untuk memulai percakapan
        </p>
      </div>
    </div>
  );
}
