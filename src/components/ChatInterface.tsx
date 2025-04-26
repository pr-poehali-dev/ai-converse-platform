import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, Bot } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const exampleCommands = [
  "Напиши стихотворение о космосе",
  "Создай список покупок на неделю",
  "Расскажи анекдот",
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Привет! Я твой ИИ ассистент. Чем я могу помочь тебе сегодня?",
      isUser: false,
      timestamp: new Date(),
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
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Имитация ответа от ИИ
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 1,
        text: generateAIResponse(input),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  const generateAIResponse = (query: string) => {
    const responses = [
      "Я понял твой запрос. Сейчас работаю над ответом.",
      "Интересный вопрос! Вот что я думаю по этому поводу...",
      "Конечно, я могу помочь с этим. Вот информация, которую ты запрашиваешь.",
      "Я выполню эту задачу для тебя. Вот результат.",
      "Мне нужно больше информации, чтобы лучше ответить на твой вопрос.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
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

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
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
              <p className="whitespace-pre-wrap break-words">{msg.text}</p>
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
          <h3 className="text-sm font-medium mb-2">Попробуйте спросить:</h3>
          <div className="flex flex-wrap gap-2">
            {exampleCommands.map((command, index) => (
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
            placeholder="Напишите сообщение..."
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
