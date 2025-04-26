import { useState } from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatInterface from "@/components/ChatInterface";
import Sidebar from "@/components/Sidebar";

const Index = () => {
  const [activeMode, setActiveMode] = useState("text");

  const handleNewChat = () => {
    console.log("Creating new chat");
    // Очистить историю сообщений и начать новый чат
    localStorage.removeItem('chatMessages');
    setActiveMode("text");
  };

  const handleSelectMode = (mode: string) => {
    setActiveMode(mode);
  };

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onNewChat={handleNewChat} onSelectMode={handleSelectMode} />
        <main className="flex-1">
          <ChatInterface activeMode={activeMode} onNewChat={handleNewChat} />
        </main>
      </div>
    </div>
  );
};

export default Index;
