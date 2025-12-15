import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Zap, Search, Activity, AlertTriangle, AlertOctagon, Wrench,
} from "lucide-react";

import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWelcome from "../components/chat/ChatWelcome";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";

import {
  createSession,
  sendChatMessage,
  getChatMessages,
} from "../api/chatService";

import toTitleCase from "../utils/toTitleCase";

export default function Chatbot() {
  const { chatSidebarOpen, setChatSidebarOpen } = useOutletContext();

  const [USER_NAME, setUSER_NAME] = useState("Pengguna");
  const [USER_ID, setUSER_ID] = useState(null);

  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const d = JSON.parse(atob(token.split(".")[1]));
      setUSER_NAME(toTitleCase(d.full_name));
      setUSER_ID(d.id);
    } catch {}
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const quickActions = [
    { icon: Zap, title: "Prediksi Manual (ML)", template: "Prediksi Manual ML" },
    { icon: Search, title: "Cek Mesin", prompt: "Cek mesin 5" },
    { icon: Activity, title: "Trend Mesin", prompt: "Trend mesin 3" },
    { icon: AlertTriangle, title: "Mesin Critical", prompt: "Mesin kritis?" },
    { icon: AlertOctagon, title: "Cek Anomali", prompt: "Cek anomali" },
    { icon: Wrench, title: "Ticket Maintenance", template: "Buat ticket" },
  ];

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages(p => [...p, { id: Date.now(), text, isBot: false }]);
    setInput("");
    setLoading(true);

    try {
      let sid = sessionId ?? await createSession(USER_ID);
      setSessionId(sid);

      const res = await sendChatMessage({ sessionId: sid, message: text, userId: USER_ID });

      setMessages(p => [...p, { id: Date.now(), text: res.reply, isBot: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full overflow-hidden">

      <div className="hidden md:block">
        <ChatSidebar
          username={USER_NAME}
          onNewChat={() => setSessionId(null)}
          onSelectChat={setSessionId}
          activeSessionId={sessionId}
        />
      </div>

      {chatSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setChatSidebarOpen(false)} />
          <div className="relative w-64 h-full bg-white">
            <ChatSidebar
              username={USER_NAME}
              onNewChat={() => setChatSidebarOpen(false)}
              onSelectChat={() => setChatSidebarOpen(false)}
              activeSessionId={sessionId}
            />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col bg-gray-50">
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {messages.length === 0 && (
            <ChatWelcome userName={USER_NAME} quickActions={quickActions} setInput={setInput} />
          )}

          <ChatMessages messages={messages} loading={loading} bottomRef={bottomRef} />
        </div>

        <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
      </div>
    </div>
  );
}
