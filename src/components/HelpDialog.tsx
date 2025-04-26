import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpDialog = ({ open, onOpenChange }: HelpDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Справка</DialogTitle>
          <DialogDescription>
            Как использовать ИИ ассистента эффективно
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Как задавать вопросы</AccordionTrigger>
              <AccordionContent>
                Формулируйте ваши вопросы четко и конкретно. Чем точнее запрос, тем точнее будет ответ. 
                Вы можете задавать вопросы на любую тему: от математики до философии, от программирования до литературы.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Генерация изображений</AccordionTrigger>
              <AccordionContent>
                Для создания изображения, напишите: "Нарисуй [описание]" или "Сгенерируй изображение [описание]". 
                Описывайте желаемое изображение подробно, указывая стиль, настроение, детали и цвета.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Анализ текста</AccordionTrigger>
              <AccordionContent>
                ИИ может анализировать тексты, искать в них информацию, суммировать их содержание.
                Просто скопируйте текст и попросите ИИ его проанализировать или задайте конкретный вопрос по его содержанию.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Ограничения</AccordionTrigger>
              <AccordionContent>
                ИИ не имеет доступа к интернету и знает информацию только до определенной даты.
                ИИ не может выполнять действия, которые требуют доступа к вашим личным данным или файлам.
                ИИ следует этическим принципам и не будет создавать вредоносный контент.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
