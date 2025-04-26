import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, Bot, Image as ImageIcon, Upload, Search, MessageSquare, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type MessageType = "text" | "image" | "document";

type Message = {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
  type: MessageType;
};

const exampleTextCommands = [
  "Расскажи про квантовую физику простыми словами",
  "Составь план тренировок для начинающего бегуна",
  "Объясни, как работает блокчейн",
];

const exampleImageCommands = [
  "Космический корабль пролетает мимо газового гиганта с кольцами",
  "Уютная кофейня в дождливый день, акварельный стиль",
  "Футуристический город на закате, неоновые огни",
];

const exampleDocumentCommands = [
  "Проанализируй содержимое этого документа",
  "Сделай краткое резюме из текста",
  "Найди ключевые факты в этом документе",
];

interface ChatInterfaceProps {
  activeMode?: string;
  onNewChat?: () => void;
}

const ChatInterface = ({ activeMode = "text", onNewChat }: ChatInterfaceProps) => {
  const [activeTab, setActiveTab] = useState<MessageType>(activeMode as MessageType);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSearchingWeb, setIsSearchingWeb] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize messages or load from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string timestamps back to Date objects
        const messagesWithDateObjects = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDateObjects);
      } catch (e) {
        console.error("Error parsing saved messages:", e);
        initializeDefaultMessage();
      }
    } else {
      initializeDefaultMessage();
    }
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Effect for changing mode from sidebar
  useEffect(() => {
    setActiveTab(activeMode as MessageType);
  }, [activeMode]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const initializeDefaultMessage = () => {
    setMessages([{
      id: 0,
      content: "Привет! Я твой ИИ ассистент. Чем я могу помочь тебе сегодня?",
      isUser: false,
      timestamp: new Date(),
      type: "text",
    }]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleNewChat = () => {
    setMessages([]);
    initializeDefaultMessage();
    setInput("");
    if (onNewChat) onNewChat();
  };

  const handleSend = () => {
    if (!input.trim() && activeTab !== "document") return;

    const userMessage: Message = {
      id: messages.length,
      content: input,
      isUser: true,
      timestamp: new Date(),
      type: activeTab,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Different processing based on message type
    switch (activeTab) {
      case "text":
        processTextMessage(input);
        break;
      case "image":
        processImageGeneration(input);
        break;
      case "document":
        if (isUploading) {
          processDocumentAnalysis();
        } else {
          toast({
            title: "Загрузите документ",
            description: "Для анализа документа необходимо сначала загрузить файл",
          });
        }
        break;
    }
  };

  const processTextMessage = (query: string) => {
    // Simulate web search for complex questions
    const isComplexQuestion = query.length > 50 || 
                             query.includes("как") || 
                             query.includes("почему") || 
                             query.includes("объясни");
    
    if (isComplexQuestion) {
      setIsSearchingWeb(true);
      
      // Simulate web search delay
      setTimeout(() => {
        const aiMessage: Message = {
          id: messages.length + 1,
          content: generateDetailedResponse(query),
          isUser: false,
          timestamp: new Date(),
          type: "text",
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsSearchingWeb(false);
      }, 2000);
    } else {
      // Simple response without web search
      setTimeout(() => {
        const aiMessage: Message = {
          id: messages.length + 1,
          content: generateSimpleResponse(query),
          isUser: false,
          timestamp: new Date(),
          type: "text",
        };
        setMessages((prev) => [...prev, aiMessage]);
      }, 800);
    }
  };

  const processImageGeneration = (prompt: string) => {
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 1,
        content: generateAIImage(prompt),
        isUser: false,
        timestamp: new Date(),
        type: "image",
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1500);
  };

  const processDocumentAnalysis = () => {
    setIsUploading(false);
    
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 1,
        content: `
# Анализ документа
        
## Основная информация
- **Тип документа**: PDF-файл
- **Количество страниц**: 5
- **Язык**: Русский
        
## Ключевые темы
1. Финансовая отчетность за Q3 2024
2. Анализ рыночных тенденций
3. Прогноз на следующий квартал
        
## Важные факты
- Рост выручки на 15% по сравнению с предыдущим кварталом
- Запуск нового продукта запланирован на июнь 2025
- Расширение присутствия на азиатских рынках
        
## Рекомендации
- Обратить внимание на раздел о рисках на странице 3
- Детали финансовых показателей представлены в таблице на странице 4
- Контактная информация для инвесторов находится на последней странице
        `,
        isUser: false,
        timestamp: new Date(),
        type: "text",
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 2000);
  };

  const generateSimpleResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("привет") || lowerQuery.includes("здравствуй")) {
      return "Привет! Чем я могу тебе помочь сегодня?";
    }
    
    if (lowerQuery.includes("как дела") || lowerQuery.includes("как ты")) {
      return "У меня всё отлично! Я готов помогать тебе с вопросами и задачами. Что тебя интересует?";
    }
    
    if (lowerQuery.includes("спасибо")) {
      return "Пожалуйста! Рад быть полезным. Если у тебя появятся ещё вопросы, я всегда готов помочь.";
    }
    
    // Default response for simple queries
    return `Я обработал твой запрос: "${query}". Вот мой ответ. Учитывая контекст твоего вопроса, я могу сказать, что это интересная тема, которая заслуживает внимания. Если тебе нужны более подробные сведения, не стесняйся уточнить свой вопрос.`;
  };

  const generateDetailedResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("квантов") && lowerQuery.includes("физик")) {
      return `
## Квантовая физика простыми словами

Квантовая физика изучает поведение очень маленьких объектов — атомов и частиц, из которых они состоят. В отличие от обычной физики, которую мы наблюдаем в повседневной жизни, квантовая физика работает по странным правилам:

1. **Частицы могут быть в нескольких местах одновременно** — это называется "суперпозиция". Представь, что ты можешь одновременно находиться и дома, и на работе, пока никто за тобой не наблюдает.

2. **Частицы могут мгновенно "общаться" друг с другом на любом расстоянии** — это явление называется "квантовая запутанность". Как будто у тебя и твоего друга на разных концах города есть волшебные перчатки, и когда ты надеваешь свою, его перчатка тоже мгновенно надевается.

3. **Частицы ведут себя и как волны, и как частицы одновременно**. Это похоже на то, как если бы мяч мог одновременно катиться как твердый предмет и распространяться как волна на воде.

Благодаря этим странным свойствам мы имеем современные технологии: компьютеры, лазеры, МРТ-сканеры и многое другое. Учёные работают над квантовыми компьютерами, которые смогут решать задачи, недоступные обычным компьютерам.
      `;
    }
    
    if (lowerQuery.includes("тренировк") && lowerQuery.includes("бег")) {
      return `
## План тренировок для начинающего бегуна (2 недели)

### Общие рекомендации:
- Перед каждой тренировкой делай 5-минутную разминку (ходьба, легкие упражнения)
- После каждой тренировки — 5-минутную заминку и растяжку
- Пей достаточно воды до, во время и после тренировки
- Используй удобную беговую обувь
- Слушай своё тело — при боли или сильном дискомфорте сделай перерыв

### Неделя 1:

**Понедельник:**
- 5 минут ходьба
- Чередуй: 1 минута бег / 2 минуты ходьба (повтори 6 раз)
- 5 минут ходьба

**Вторник:**
- День отдыха или легкая активность (прогулка, растяжка)

**Среда:**
- 5 минут ходьба
- Чередуй: 1 минута бег / 2 минуты ходьба (повтори 6 раз)
- 5 минут ходьба

**Четверг:**
- День отдыха или легкая активность

**Пятница:**
- 5 минут ходьба
- Чередуй: 1,5 минуты бег / 1,5 минуты ходьба (повтори 6 раз)
- 5 минут ходьба

**Суббота-Воскресенье:**
- Активный отдых, прогулки на свежем воздухе

### Неделя 2:

**Понедельник:**
- 5 минут ходьба
- Чередуй: 2 минуты бег / 1 минута ходьба (повтори 7 раз)
- 5 минут ходьба

**Вторник:**
- День отдыха или легкая активность

**Среда:**
- 5 минут ходьба
- Чередуй: 2 минуты бег / 1 минута ходьба (повтори 7 раз)
- 5 минут ходьба

**Четверг:**
- День отдыха или легкая активность

**Пятница:**
- 5 минут ходьба
- Чередуй: 3 минуты бег / 1 минута ходьба (повтори 5 раз)
- 5 минут ходьба

**Суббота:**
- Активный отдых

**Воскресенье:**
- 5 минут ходьба
- Пробеги 15 минут в комфортном темпе (можно с короткими паузами для ходьбы, если необходимо)
- 5 минут ходьба

После этих двух недель ты можешь постепенно увеличивать время бега и уменьшать время ходьбы. Цель — через 8-10 недель бегать без остановки 30 минут.
      `;
    }
    
    if (lowerQuery.includes("блокчейн")) {
      return `
## Как работает блокчейн

Блокчейн — это технология, которая позволяет безопасно хранить и передавать информацию без центрального контролирующего органа. Вот как это работает:

### 1. Распределенная база данных
Представь, что есть книга учета, где записаны все транзакции. Но вместо того, чтобы хранить её в одном месте, копии этой книги есть у тысяч людей по всему миру. Это делает систему очень устойчивой — если кто-то попытается изменить информацию в своей копии, другие участники сразу заметят несоответствие.

### 2. Блоки и цепь
Информация в блокчейне хранится в "блоках". Когда блок заполняется данными (например, транзакциями), он добавляется к предыдущим блокам, образуя "цепь". Каждый новый блок содержит криптографическую ссылку на предыдущий, что делает изменение прошлых данных практически невозможным.

### 3. Проверка и консенсус
Прежде чем новый блок будет добавлен в цепь, компьютеры в сети (узлы) должны проверить его валидность и достичь согласия. Это достигается через различные механизмы консенсуса:

- **Proof of Work (PoW)**: Компьютеры решают сложные математические задачи — кто решил первым, тот и добавляет блок (используется в Bitcoin)
- **Proof of Stake (PoS)**: Право создать блок получает тот, кто владеет большим количеством криптовалюты и дольше её хранит (используется в Ethereum 2.0)

### 4. Безопасность через криптографию
Вся информация в блокчейне зашифрована с помощью криптографических алгоритмов. Участники используют пары ключей:
- Публичный ключ (как номер банковского счета)
- Приватный ключ (как пароль от счета)

### Примеры использования
- **Криптовалюты** (Bitcoin, Ethereum)
- **Умные контракты** — программы, которые автоматически выполняются при выполнении определенных условий
- **Цепочки поставок** — отслеживание движения товаров
- **Голосование** — защищенные от фальсификаций системы
- **Медицинские записи** — безопасное хранение данных пациентов

Блокчейн не идеален — у него есть проблемы с масштабируемостью и энергопотреблением (особенно для PoW), но это революционная технология, которая продолжает развиваться и находить новые применения.
      `;
    }
    
    // Default detailed response
    return `
## Ответ на твой вопрос: "${query}"

Это интересный вопрос, требующий детального рассмотрения. Я провел анализ доступной информации и могу предложить следующий ответ.

### Ключевые аспекты

1. **Основная концепция**
   Данная тема затрагивает несколько важных областей знаний, включая теоретические основы и практическое применение.

2. **Исторический контекст**
   Вопрос имеет богатую историю развития, начиная с первых исследований в этой области и заканчивая современными достижениями.

3. **Практическое применение**
   Существует множество способов применения этих знаний в реальной жизни, от бытовых задач до профессиональной деятельности.

### Дополнительные материалы

Для более глубокого понимания темы рекомендую обратить внимание на следующие источники:
- Специализированная литература по теме
- Онлайн-курсы от экспертов в данной области
- Тематические форумы и сообщества

Если у тебя есть более конкретные вопросы по этой теме, я готов предоставить более детальный ответ.
    `;
  };

  const generateAIImage = (prompt: string) => {
    // Map of keywords to higher quality Unsplash images
    const keywords = prompt.toLowerCase();
    let imageUrl = "";
    
    if (keywords.includes("космич") || keywords.includes("планет") || keywords.includes("звезд")) {
      imageUrl = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80";
    } else if (keywords.includes("портрет") || keywords.includes("человек")) {
      imageUrl = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80";
    } else if (keywords.includes("город") || keywords.includes("футуристич") || keywords.includes("неон")) {
      imageUrl = "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&auto=format&fit=crop&q=80";
    } else if (keywords.includes("природ") || keywords.includes("лес") || keywords.includes("горы")) {
      imageUrl = "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&auto=format&fit=crop&q=80";
    } else if (keywords.includes("животн") || keywords.includes("кот") || keywords.includes("собак")) {
      imageUrl = "https://images.unsplash.com/photo-1574144113084-b6f450cc5e0c?w=800&auto=format&fit=crop&q=80";
    } else if (keywords.includes("кофейн") || keywords.includes("уютн") || keywords.includes("дожд")) {
      imageUrl = "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=800&auto=format&fit=crop&q=80";
    } else if (keywords.includes("закат") || keywords.includes("рассвет") || keywords.includes("небо")) {
      imageUrl = "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&auto=format&fit=crop&q=80";
    } else if (keywords.includes("абстрак") || keywords.includes("узор") || keywords.includes("паттерн")) {
      imageUrl = "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=800&auto=format&fit=crop&q=80";
    } else if (keywords.includes("акварель") || keywords.includes("живопись") || keywords.includes("картин")) {
      imageUrl = "https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=800&auto=format&fit=crop&q=80";
    } else if (keywords.includes("вода") || keywords.includes("море") || keywords.includes("океан")) {
      imageUrl = "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop&q=80";
    } else {
      // Default artistic image
      imageUrl = "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&auto=format&fit=crop&q=80";
    }
    
    return `
    <div class="image-generation-info">
      <p class="text-sm text-muted-foreground mb-2">Изображение сгенерировано на основе запроса: "${prompt}"</p>
      <img src="${imageUrl}" alt="AI Generated: ${prompt}" class="rounded-lg max-w-full h-auto shadow-lg" />
      <p class="text-xs text-muted-foreground mt-2">Изображение создано ИИ • Вы можете скачать это изображение</p>
    </div>
    `;
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

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setInput(`Загружен файл: ${file.name} (${(file.size / 1024).toFixed(1)} Кб)`);
      toast({
        title: "Файл загружен",
        description: `${file.name} готов к анализу`,
      });
    }
  };

  const renderMessageContent = (message: Message) => {
    if (!message.isUser && message.content.includes("<img")) {
      return <div dangerouslySetInnerHTML={{ __html: message.content }} />;
    }
    return <div className="whitespace-pre-wrap break-words">{message.content}</div>;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as MessageType)} 
        className="w-full px-4 pt-2"
      >
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="text" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Текст
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Изображения
          </TabsTrigger>
          <TabsTrigger value="document" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Документы
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex items-start gap-2 max-w-[80%]`}>
              {!msg.isUser && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 ${
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
              {msg.isUser && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-blue-600 text-white">Я</AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        ))}
        {isSearchingWeb && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
              </Avatar>
              <div className="bg-accent text-accent-foreground rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 animate-pulse" />
                  <p>Ищу информацию в интернете...</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="px-4 mb-4">
          <h3 className="text-sm font-medium mb-2">
            {activeTab === "text" 
              ? "Попробуйте спросить:" 
              : activeTab === "image" 
                ? "Попробуйте создать:" 
                : "Примеры запросов:"}
          </h3>
          <div className="flex flex-wrap gap-2">
            {(activeTab === "text" 
              ? exampleTextCommands 
              : activeTab === "image" 
                ? exampleImageCommands 
                : exampleDocumentCommands
            ).map((command, index) => (
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
          {activeTab === "document" && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={onFileSelected}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleFileUpload}
                className="flex-shrink-0"
              >
                <Upload className="h-4 w-4" />
              </Button>
            </>
          )}
          
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              activeTab === "text" 
                ? "Напишите сообщение..." 
                : activeTab === "image" 
                  ? "Опишите изображение, которое хотите создать..." 
                  : isUploading 
                    ? "Задайте вопрос по документу..." 
                    : "Загрузите документ для анализа..."
            }
            className="min-h-[60px] resize-none"
            disabled={activeTab === "document" && !isUploading}
          />
          
          <div className="flex flex-col gap-2">
            <Button 
              size="icon" 
              onClick={handleVoiceCommand}
              className="flex-shrink-0"
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              onClick={handleSend}
              className="flex-shrink-0"
              disabled={activeTab === "document" && !isUploading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
