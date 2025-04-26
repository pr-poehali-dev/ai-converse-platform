import ChatHeader from "@/components/ChatHeader";
import ChatInterface from "@/components/ChatInterface";
import Sidebar from "@/components/Sidebar";

const Index = () => {
  return (
    <div className="flex flex-col h-screen">
      <ChatHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1">
          <ChatInterface />
        </main>
      </div>
    </div>
  );
};

export default Index;
