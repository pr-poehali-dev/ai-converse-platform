import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Настройки</DialogTitle>
          <DialogDescription>
            Настройте параметры ИИ ассистента по вашему предпочтению
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Темная тема</Label>
            <Switch id="dark-mode" />
          </div>
          
          <div className="space-y-2">
            <Label>Модель ИИ</Label>
            <Select defaultValue="gpt-4">
              <SelectTrigger>
                <SelectValue placeholder="Выберите модель" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-3">GPT-3</SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gemini">Gemini</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="creativity">Креативность</Label>
              <span className="text-sm text-muted-foreground">75%</span>
            </div>
            <Slider id="creativity" defaultValue={[75]} max={100} step={1} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="length">Длина ответов</Label>
              <span className="text-sm text-muted-foreground">Средняя</span>
            </div>
            <Slider id="length" defaultValue={[50]} max={100} step={1} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Сохранить</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
