"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import AddMediaGalleryDialog from "./dialogs/AddMediaGalleryDialog";
import GalleryListItem from "./GalleryListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  removeMediaItem,
  setMediaItem,
} from "@/redux/slice/choose.gallery.slice";
import { RootState } from "@/redux/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { IResponse } from "@/types";
import { IGalleryItem } from "@/features/gallery/types";
import { useDoMutation } from "@/hooks/useDoMutation";
import { PaginationComp } from "./pagination";
import LoadingHandler from "./LoadingHandler";
import { AxiosError } from "axios";

interface IProps {
  asChooser: boolean;
}

const fetchGalleryItem = async (page = 1) => {
  return (await api.get("/api/v1/media-item?page=" + page)).data;
};

export default function MediaGallery({ asChooser = false }: IProps) {
  const [isOpen, setOpen] = useState(false);
  const [currentGalleryItem, setGalleryItem] = useState(0);
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const { selectedMedia: selectedMediaItems } = useSelector(
    (store: RootState) => store.choosedMediaItems
  );

  const { data, error, isFetching } = useQuery<
    IResponse<IGalleryItem[]>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-gallery-items", page],
    queryFn: () => fetchGalleryItem(page),
  });

  if (error) throw error;

  const { mutate, isLoading } = useDoMutation();

  return (
    <>
      <AddMediaGalleryDialog
        isOpen={isOpen}
        setOpen={setOpen}
        media_item_id={currentGalleryItem}
      />
      <div className="space-y-5 static top-0">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-2xl">Media Gallery</h2>
          <Button
            onClick={() => {
              setOpen(true);
              setGalleryItem(0);
            }}
          >
            <Plus />
            Add Media Item
          </Button>
        </div>

        <LoadingHandler
          loading={isFetching}
          error={error}
          length={data?.data.length}
          noDataMsg="No Media Item Found"
        >
          <ul className="grid grid-cols-4 gap-3">
            {data?.data.map((item) => (
              <GalleryListItem
                key={item.media_item_id}
                isDeleting={
                  isLoading && currentGalleryItem === item.media_item_id
                }
                onEditBtnClick={() => {
                  setGalleryItem(item.media_item_id);
                  setOpen(true);
                }}
                onDeleteBtnClick={() => {
                  if (
                    !confirm(
                      "Are you sure you want to remove this media item ?"
                    )
                  )
                    return;

                  setGalleryItem(item.media_item_id);
                  mutate({
                    apiPath: "/api/v1/media-item",
                    method: "delete",
                    id: item.media_item_id,
                    onSuccess() {
                      queryClient.invalidateQueries({
                        queryKey: ["get-gallery-items"],
                      });
                    },
                  });
                }}
                onChooseMediaItem={() => {
                  dispatch(
                    setMediaItem({
                      media_id: item.media_item_id,
                      where_to_use: "gallery",
                    })
                  );
                }}
                onRemoveItemSelection={() => {
                  dispatch(removeMediaItem({ media_id: item.media_item_id }));
                }}
                asChooser={asChooser}
                isSelected={
                  selectedMediaItems.findIndex(
                    (element) => element.media_id === item.media_item_id
                  ) !== -1
                }
                galleryItem={item}
              />
            ))}
          </ul>
          <PaginationComp
            totalPage={data?.totalPage}
            page={page}
            onPageChange={setPage}
          />
        </LoadingHandler>
      </div>
    </>
  );
}
