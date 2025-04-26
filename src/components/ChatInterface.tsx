import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, Bot, Image as ImageIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MessageType = "text" | "image";

type Message = {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
  type: MessageType;
};

const exampleTextCommands = [
  "Напиши стихотворение о космосе",
  "Создай список покупок на неделю",
  "Расскажи интересный факт о животных",
];

const exampleImageCommands = [
  "Нарисуй закат на пляже",
  "Сгенерируй портрет ученого в стиле акварель",
  "Создай изображение футуристического города",
];

const ChatInterface = () => {
  const [activeTab, setActiveTab] = useState<"text" | "image">("text");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      content: "Привет! Я твой ИИ ассистент. Чем я могу помочь тебе сегодня?",
      isUser: false,
      timestamp: new Date(),
      type: "text",
    },
  ]);
  const [input, setInput] = useState("");
  const { toast } = useToast();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length,
      content: input,
      isUser: true,
      timestamp: new Date(),
      type: activeTab,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Имитация ответа от ИИ
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 1,
        content: activeTab === "image" ? generateAIImage(input) : generateAIResponse(input),
        isUser: false,
        timestamp: new Date(),
        type: activeTab,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  const textResponses = [
    {
      keywords: ["стих", "поэм", "стихотворение"],
      response: `Вот стихотворение, которое я написал специально для тебя:

В бескрайнем космосе парим,
Среди созвездий и планет.
Мы тайны звёзд раскрыть хотим,
И мчимся вдаль за новым светом.

Вселенная вокруг поёт,
Симфонию миров рождая.
А мы — песчинки, что несёт
Волна времен, не замечая.`,
    },
    {
      keywords: ["список", "покупк"],
      response: `Вот список покупок на неделю:

📋 Продукты:
- Овощи: помидоры, огурцы, морковь, лук
- Фрукты: яблоки, бананы, апельсины
- Молочные продукты: молоко, творог, сыр, йогурт
- Мясо/рыба: куриная грудка, говядина, форель
- Крупы: рис, гречка, овсянка
- Хлебобулочные изделия: хлеб, лаваш

📦 Бытовая химия:
- Моющее средство для посуды
- Стиральный порошок
- Чистящее средство для ванной

💊 Аптека:
- Витамины
- Пластыри`,
    },
    {
      keywords: ["факт", "интересно", "животн"],
      response: `Интересный факт о животных: Осьминоги имеют три сердца! Два сердца перекачивают кровь через жабры, а третье циркулирует её по всему телу. Когда осьминог плывёт, его третье сердце перестаёт биться, что объясняет, почему эти удивительные существа предпочитают ползать, а не плавать - это менее энергозатратно для них.`,
    },
    {
      keywords: ["привет", "здравствуй", "добрый"],
      response: `Привет! Рад снова общаться с тобой. Чем я могу помочь сегодня? Могу написать текст, ответить на вопрос или сгенерировать изображение — просто скажи, что тебе нужно.`,
    },
  ];

  const generateAIResponse = (query: string) => {
    // Ищем совпадения с ключевыми словами
    for (const item of textResponses) {
      if (item.keywords.some(keyword => query.toLowerCase().includes(keyword))) {
        return item.response;
      }
    }
    
    // Если нет совпадений, генерируем более общий ответ
    const fallbackResponses = [
      `Спасибо за ваш запрос: "${query}". Я обработал эту информацию и могу предложить следующее решение. Прежде всего, важно понимать контекст задачи. Исходя из имеющихся данных, я рекомендую начать с анализа ключевых элементов и затем двигаться к более детальному рассмотрению вопроса.`,
      
      `Ваш вопрос о "${query}" весьма интересен. Позвольте представить несколько соображений на эту тему. В современном понимании этот вопрос имеет несколько аспектов, каждый из которых заслуживает внимания. Я постараюсь охватить основные моменты и предложить структурированный ответ.`,
      
      `По вашему запросу "${query}" я могу предоставить следующую информацию. Этот вопрос затрагивает несколько важных тем, которые тесно взаимосвязаны. Давайте рассмотрим их последовательно, чтобы сформировать полное представление о ситуации.`,
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const generateAIImage = (prompt: string) => {
    // В реальном приложении здесь был бы запрос к API генерации изображений
    // Сейчас просто возвращаем URL с Unsplash по теме запроса
    const keywords = prompt.toLowerCase();
    let imageUrl = "";
    
    if (keywords.includes("закат") || keywords.includes("пляж")) {
      imageUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop";
    } else if (keywords.includes("портрет") || keywords.includes("учен")) {
      imageUrl = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&auto=format&fit=crop";
    } else if (keywords.includes("город") || keywords.includes("футуристич")) {
      imageUrl = "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&auto=format&fit=crop";
    } else if (keywords.includes("природ") || keywords.includes("лес")) {
      imageUrl = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&auto=format&fit=crop";
    } else if (keywords.includes("животн") || keywords.includes("кот") || keywords.includes("собак")) {
      imageUrl = "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600&auto=format&fit=crop";
    } else {
      // Дефолтное изображение, если не нашли подходящих ключевых слов
      imageUrl = "https://images.unsplash.com/photo-1519074069390-a69ea0299a6b?w=600&auto=format&fit=crop";
    }
    
    return `<img src="${imageUrl}" alt="Сгенерировано по запросу: ${prompt}" class="rounded-lg max-w-full" />`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceCommand = () => {
    toast({
      title: "Голосовой ввод",
      description: "Голосовой ввод пока недоступен",
    });
  };

  const useExampleCommand = (command: string) => {
    setInput(command);
  };

  const renderMessageContent = (message: Message) => {
    if (message.type === "image" && !message.isUser) {
      return <div dangerouslySetInnerHTML={{ __html: message.content }} />;
    }
    return <p className="whitespace-pre-wrap break-words">{message.content}</p>;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as "text" | "image")} 
        className="w-full px-4 pt-2"
      >
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="text" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Текстовый режим
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Генерация изображений
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.isUser
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground"
              }`}
            >
              {renderMessageContent(msg)}
              <div
                className={`text-xs mt-1 ${
                  msg.isUser ? "text-primary-foreground/80" : "text-accent-foreground/80"
                }`}
              >
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {messages.length === 1 && (
        <div className="px-4 mb-4">
          <h3 className="text-sm font-medium mb-2">
            {activeTab === "text" ? "Попробуйте спросить:" : "Попробуйте создать:"}
          </h3>
          <div className="flex flex-wrap gap-2">
            {(activeTab === "text" ? exampleTextCommands : exampleImageCommands).map((command, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-xs"
                onClick={() => useExampleCommand(command)}
              >
                {command}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t p-4">
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={activeTab === "text" ? "Напишите сообщение..." : "Опишите изображение, которое хотите создать..."}
            className="min-h-[60px] resize-none"
          />
          <div className="flex flex-col gap-2">
            <Button size="icon" onClick={handleVoiceCommand}>
              <Mic className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
