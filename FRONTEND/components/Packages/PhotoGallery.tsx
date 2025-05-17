import React from "react";
import HandleDialogBtn from "../Dialogs/HandleDialogBtn";
import Image from "next/image";
import api from "@/lib/axios";
import { IMediaItem, IResponse } from "@/types";
import { extractYouTubeThumbnail } from "../Utils/extractYouTubeThumbnail";
import { Play } from "lucide-react";
import GalleryViewDialog from "../Dialogs/GalleryViewDialog";

interface IProps {
  package_id: number;
}
export default async function PhotoGallery({ package_id }: IProps) {
  const gallery = (
    await api.get<IResponse<IMediaItem[]>>(
      `/api/v1/package/gallery/${package_id}`
    )
  ).data;

  return (
    <>
      <GalleryViewDialog gallery_info={gallery.data} />

      <ul className="grid grid-cols-4 gap-3.5 mt-3.5 max-sm:grid-cols-2">
        {gallery.data.map((gallery, index) => (
          <li
            key={gallery.media_item_id}
            className="overflow-hidden rounded-2xl"
          >
            <HandleDialogBtn
              action_type="OPEN"
              id="gallery_view"
              className="!size-full relative"
              extraValue={{
                currentClickedIndex: index,
              }}
            >
              <Image
                className="size-full object-cover cursor-pointer"
                src={
                  gallery.media_type === "youtube-link"
                    ? extractYouTubeThumbnail(gallery.item_link)
                    : gallery.item_link
                }
                alt={gallery.alt_tag || "Galley Images"}
                height={1200}
                width={1200}
              />

              {gallery.media_type === "youtube-link" ? (
                <div className="absolute cursor-pointer inset-0 flex items-center justify-center bg-[#00000049]">
                  <div className="bg-white size-10 rounded-full p-2 flex items-center justify-center">
                    <Play strokeLinecap="round" size={12} />
                  </div>
                </div>
              ) : null}
            </HandleDialogBtn>
          </li>
        ))}
      </ul>
    </>
  );
}
