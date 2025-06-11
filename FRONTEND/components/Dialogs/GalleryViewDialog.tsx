"use client";

import React, { useEffect, useState } from "react";
import DialogWrapper from "./DialogWrapper";
import DialogBody from "./DialogBody";
import { IMediaItem } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AiGalleryDialog } from "../AiComponents/AiGalleryDialog";
import { setDialog } from "@/redux/slices/dialog.slice";

interface IProps {
  gallery_info: IMediaItem[];
}

export default function GalleryViewDialog({ gallery_info }: IProps) {
  const { extraValue } = useSelector((state: RootState) => state.dialogSlice);

  const dispatch = useDispatch();

  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    if (extraValue) {
      setCurrentItemIndex(extraValue.currentClickedIndex);
    }
  }, [extraValue]);

  return (
    <DialogWrapper
      id="gallery_view"
      className="flex items-center justify-center"
    >
      <DialogBody theme="none">
        <AiGalleryDialog
          initialIndex={currentItemIndex}
          isOpen={true}
          images={gallery_info.map((item) => ({
            id: item.media_item_id.toString(),
            alt: item.alt_tag || "",
            src: item.item_link,
          }))}
          onClose={() => {
            dispatch(
              setDialog({
                id: "gallery_view",
                type: "CLOSE",
              })
            );
          }}
        />
      </DialogBody>
    </DialogWrapper>
  );

  // return (
  //   <DialogWrapper
  //     id="gallery_view"
  //     className="flex items-center justify-center"
  //   >
  //     {/* Header */}
  //     <button className="size-10 bg-accent absolute top-10 right-10 flex items-center justify-center rounded-full active:scale-90">
  //       <CircleX size={18} color="#fff" />
  //     </button>

  //     <DialogBody theme="none" className="relative">
  //       {/* Body Data */}
  //       <div className="min-w-[60vw] max-w-[60vw] h-[80vh] bg-white rounded-2xl z-0 overflow-hidden max-sm:max-w-[80vw] max-sm:min-w-[80vw] max-sm:h-[40vh]">
  //         {gallery_info[currentItemIndex].media_type === "youtube-link" ? (
  //           <iframe
  //             src={
  //               convertToYouTubeEmbed(
  //                 gallery_info[currentItemIndex].item_link
  //               ) || ""
  //             }
  //             className="size-full"
  //           />
  //         ) : (
  //           <Image
  //             src={gallery_info[currentItemIndex].item_link}
  //             alt={gallery_info[currentItemIndex].alt_tag || ""}
  //             height={1200}
  //             width={1200}
  //             quality={100}
  //             className="size-full object-cover"
  //           />
  //         )}
  //       </div>
  //       {/* Action Btns */}
  //       <div className="absolute z-10 top-0 bottom-0 -left-5 flex items-center justify-center">
  //         <button
  //           onClick={() =>
  //             setCurrentItemIndex((pre) => {
  //               if (pre <= 0) return gallery_info.length - 1;
  //               return pre - 1;
  //             })
  //           }
  //           className="size-10 rounded-full flex items-center justify-center bg-accent text-white active:scale-90"
  //         >
  //           <ArrowLeft size={15} />
  //         </button>
  //       </div>
  //       <div className="absolute z-10 top-0 bottom-0 -right-5 flex items-center justify-center">
  //         <button
  //           onClick={() => {
  //             setCurrentItemIndex((pre) => {
  //               if (pre >= gallery_info.length - 1) return 0;
  //               return pre + 1;
  //             });
  //           }}
  //           className="size-10 rounded-full flex items-center justify-center bg-accent text-white active:scale-90"
  //         >
  //           <ArrowRight size={15} />
  //         </button>
  //       </div>
  //     </DialogBody>
  //   </DialogWrapper>
  // );
}
