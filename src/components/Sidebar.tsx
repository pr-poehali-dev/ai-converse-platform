import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  PlusCircle, 
  MessageSquare, 
  Image as ImageIcon, 
  FileText, 
  Settings, 
  HelpCircle 
} from "lucide-react";
import { useState } from "react";
import SettingsDialog from "./SettingsDialog";
import HelpDialog from "./HelpDialog";

interface SidebarProps {
  onNewChat: () => void;
  onSelectMode: (mode: string) => void;
}

const Sidebar = ({ onNewChat, onSelectMode }: SidebarProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="w-64 border-r h-[calc(100vh-4rem)] p-4 hidden md:block flex flex-col">
      <div className="flex flex-col flex-1">
        <Button 
          className="w-full justify-start" 
          variant="default"
          onClick={onNewChat}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Новый чат
        </Button>
        
        <h3 className="text-sm font-medium my-2">Возможности</h3>
        <Separator className="my-2" />
        
        <Button 
          className="w-full justify-start" 
          variant="ghost"
          onClick={() => onSelectMode("text")}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Текстовые запросы
        </Button>
        
        <Button 
          className="w-full justify-start" 
          variant="ghost"
          onClick={() => onSelectMode("image")}
        >
          <ImageIcon className="mr-2 h-4 w-4" />
          Генерация изображений
        </Button>
        
        <Button 
          className="w-full justify-start" 
          variant="ghost"
          onClick={() => onSelectMode("document")}
        >
          <FileText className="mr-2 h-4 w-4" />
          Анализ документов
        </Button>
      </div>
      
      <div className="mt-auto space-y-2">
        <Separator className="my-2" />
        <Button 
          className="w-full justify-start" 
          variant="ghost"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className="mr-2 h-4 w-4" />
          Настройки
        </Button>
        
        <Button 
          className="w-full justify-start" 
          variant="ghost"
          onClick={() => setHelpOpen(true)}
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          Помощь
        </Button>
      </div>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      <HelpDialog open={helpOpen} onOpenChange={setHelpOpen} />
    </div>
  );
};

export default Sidebar;
