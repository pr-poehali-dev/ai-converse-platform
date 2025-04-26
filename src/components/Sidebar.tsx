import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  PlusCircle, 
  MessageSquare, 
  Image, 
  FileText, 
  Settings, 
  HelpCircle 
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 border-r h-[calc(100vh-4rem)] p-4 hidden md:block">
      <div className="space-y-2">
        <Button className="w-full justify-start" variant="default">
          <PlusCircle className="mr-2 h-4 w-4" />
          Новый чат
        </Button>
        
        <h3 className="text-sm font-medium my-2">Возможности</h3>
        <Separator className="my-2" />
        
        <Button className="w-full justify-start" variant="ghost">
          <MessageSquare className="mr-2 h-4 w-4" />
          Текстовые запросы
        </Button>
        
        <Button className="w-full justify-start" variant="ghost">
          <Image className="mr-2 h-4 w-4" />
          Генерация изображений
        </Button>
        
        <Button className="w-full justify-start" variant="ghost">
          <FileText className="mr-2 h-4 w-4" />
          Анализ документов
        </Button>
      </div>
      
      <div className="absolute bottom-4 space-y-2 w-[calc(100%-2rem)]">
        <Separator className="my-2" />
        <Button className="w-full justify-start" variant="ghost">
          <Settings className="mr-2 h-4 w-4" />
          Настройки
        </Button>
        
        <Button className="w-full justify-start" variant="ghost">
          <HelpCircle className="mr-2 h-4 w-4" />
          Помощь
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
