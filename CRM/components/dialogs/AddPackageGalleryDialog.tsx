import { useDispatch, useSelector } from "react-redux";
import MediaGallery from "../MediaGallery";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { RootState } from "@/redux/store";
import { useDoMutation } from "@/hooks/useDoMutation";
import { useSearchParams } from "next/navigation";
import { ButtonLoading } from "../ui/button-loading";
import { useQueryClient } from "@tanstack/react-query";
import { clear } from "@/redux/slice/choose.gallery.slice";

interface IProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postEndPoint: string;
  keyName: string;
}

function AddPackageGalleryDialog({
  isOpen,
  setOpen,
  postEndPoint,
  keyName,
}: IProps) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const currentId = parseInt(searchParams.get(keyName) || "0");

  const { selectedMedia } = useSelector(
    (state: RootState) => state.choosedMediaItems
  );

  const { isLoading, mutate } = useDoMutation();
  const onSaveBtnClick = () => {
    mutate({
      apiPath: postEndPoint,
      method: "post",
      id: currentId,
      formData: {
        media_info: selectedMedia,
      },
      onSuccess() {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["package-gallery"] });
        dispatch(clear());
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="min-w-[80rem] max-h-[99vh]">
        <DialogHeader>
          <DialogTitle>Choose Media</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] px-10">
          <MediaGallery asChooser={true} />
        </ScrollArea>

        <DialogFooter>
          <ButtonLoading loading={isLoading} onClick={onSaveBtnClick}>
            Save
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddPackageGalleryDialog;
