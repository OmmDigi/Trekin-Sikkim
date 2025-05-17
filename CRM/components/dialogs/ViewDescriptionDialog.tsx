import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

interface IProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ViewDescriptionDialog({ isOpen, setOpen }: IProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Full Message</DialogTitle>
        <ScrollArea className="max-h-[80vh]">
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
            voluptatum omnis tempora quos minus eum eveniet deleniti, deserunt
            labore! Earum incidunt repellendus aut laudantium hic aperiam
            perferendis quasi sapiente deleniti!Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </DialogDescription>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
