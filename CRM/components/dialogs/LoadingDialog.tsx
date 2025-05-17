import LoadingLayout from "../LoadingLayout";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { cn } from "@/lib/utils";

export default function LoadingDialog() {
  const { isOpen } = useSelector(
    (state: RootState) => state.loadingDialogSlice
  );
  return (
    <dialog
      open={isOpen}
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[9999] size-full flex items-center justify-center bg-black/50",
        isOpen ? "fixed" : "hidden"
      )}
    >
      <LoadingLayout className="text-white" />
    </dialog>
  );
}
