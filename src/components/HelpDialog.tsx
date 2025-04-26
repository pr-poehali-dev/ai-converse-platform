import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Image, FileText } from "lucide-react";

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpDialog = ({ open, onOpenChange }: HelpDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Справка по использованию</DialogTitle>
          <DialogDescription>
            Узнайте, как эффективно использовать все возможности ИИ-ассистента
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="text" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Текстовые запросы
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Генерация изображений
            </TabsTrigger>
            <TabsTrigger value="document" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Анализ документов
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="mt-4 space-y-4">
            <h3 className="text-lg font-medium">Как задавать вопросы ИИ</h3>
            <p>Чтобы получить наиболее полезный и точный ответ:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Будьте конкретны в своих вопросах</li>
              <li>Указывайте контекст, когда это необходимо</li>
              <li>Для сложных задач разбивайте их на более мелкие вопросы</li>
              <li>Если ответ не удовлетворительный, попробуйте переформулировать вопрос</li>
            </ul>
            <h3 className="text-lg font-medium mt-4">Примеры эффективных запросов:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>"Объясни квантовую физику простыми словами для школьника"</li>
              <li>"Напиши план тренировок для начинающего бегуна на 2 недели"</li>
              <li>"Составь список из 10 книг по психологии с кратким описанием каждой"</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="image" className="mt-4 space-y-4">
            <h3 className="text-lg font-medium">Генерация изображений с помощью ИИ</h3>
            <p>Для получения качественных изображений:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Детально описывайте желаемое изображение</li>
              <li>Указывайте стиль (акварель, масло, фотореализм и т.д.)</li>
              <li>Описывайте композицию, освещение и настроение</li>
              <li>Уточняйте детали, если первый результат не соответствует ожиданиям</li>
            </ul>
            <h3 className="text-lg font-medium mt-4">Примеры эффективных запросов:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>"Космический корабль пролетает мимо газового гиганта с кольцами, в стиле цифровой живописи"</li>
              <li>"Уютная кофейня в дождливый день, вид из окна, акварельный стиль"</li>
              <li>"Портрет старого капитана корабля с трубкой, в стиле масляной живописи, тёплые тона"</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="document" className="mt-4 space-y-4">
            <h3 className="text-lg font-medium">Анализ документов</h3>
            <p>Для эффективного анализа документов:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Загружайте четкие, хорошо отсканированные документы</li>
              <li>Указывайте, какую именно информацию вы хотите извлечь</li>
              <li>Для больших документов указывайте конкретные разделы</li>
              <li>Поддерживаются форматы: PDF, DOCX, JPG, PNG</li>
            </ul>
            <h3 className="text-lg font-medium mt-4">Возможности анализа:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Извлечение ключевой информации из документов</li>
              <li>Суммирование длинных текстов</li>
              <li>Распознавание таблиц и данных</li>
              <li>Анализ договоров и юридических документов</li>
              <li>Распознавание текста с изображений</li>
            </ul>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
