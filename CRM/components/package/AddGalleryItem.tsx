"use client";

import { useState } from "react";
import AddPackageGalleryDialog from "../dialogs/AddPackageGalleryDialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import GalleryListItem from "../GalleryListItem";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { IResponse, TMediaTypes } from "@/types";
import LoadingHandler from "../LoadingHandler";
import { AxiosError } from "axios";
import { useDoMutation } from "@/hooks/useDoMutation";
import LinkButton from "../link-button";
import PackageGalleryEditDialog from "../dialogs/PackageGalleryEditDialog";
import { TGalleryItemRole } from "@/features/package/schemaAndTypes";

const getGalleryItem = async (getEndpoint: string, package_id: number) => {
  return (await api.get(getEndpoint + package_id)).data;
};

interface IPackageAndGallery {
  id: number;
  where_to_use: string;
  media_item_id: number;
  media_type: TMediaTypes;
  item_link: string;
  alt_tag: string;
}

interface IProps {
  currentStep: number;
  keyName: "package_id" | "category_id";
  heading: string;
  getEndpoint: string;
  postEndPoint: string;
  putEndPoint: string;
  deleteEndPoint: string;
  getSingleItemEndPoint: string;
}

function AddGalleryItem({
  currentStep,
  keyName,
  heading,
  deleteEndPoint,
  getEndpoint,
  postEndPoint,
  putEndPoint,
  getSingleItemEndPoint,
}: IProps) {
  const searchParams = useSearchParams();

  const currentId = parseInt(searchParams.get(keyName) || "0");

  const [isOpen, setIsOpen] = useState(false);
  const [galleryItemRole, setGalleryItemRole] = useState<TGalleryItemRole>({
    isOpen: false,
    id: 0,
  });

  const { data, error, isFetching, refetch } = useQuery<
    IResponse<IPackageAndGallery[]>,
    AxiosError<IResponse>
  >({
    queryKey: ["package-gallery"],
    queryFn: () => getGalleryItem(getEndpoint, currentId),
    // onSuccess(data) {
    //   const mediaInfo : ChoosedMediaItem[] = data.data.map(item => ({
    //     media_id: item.media_item_id,
    //     where_to_use: item.where_to_use as TMediaWhereToUse
    //   }))
    //   dispatch(resetMediaItem(mediaInfo))
    // },
  });

  const { isLoading, mutate } = useDoMutation();

  const handleDeleteBtn = (row_id: number) => {
    if (!confirm("Are you sure you want to remove this item ?")) return;
    mutate({
      apiPath: deleteEndPoint,
      method: "delete",
      id: row_id,
      onSuccess() {
        refetch();
      },
    });
  };

  const handleEditBtn = (row_id: number) => {
    setGalleryItemRole({
      isOpen: true,
      id: row_id,
    });
  };

  return (
    <>
      <AddPackageGalleryDialog
        isOpen={isOpen}
        setOpen={setIsOpen}
        postEndPoint={postEndPoint}
        keyName={keyName}
      />
      <PackageGalleryEditDialog
        info={galleryItemRole}
        setInfo={setGalleryItemRole}
        getSingleItemEndPoint={getSingleItemEndPoint}
        putEndPoint={putEndPoint}
      />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-2xl">{heading}</h2>
          <Button onClick={() => setIsOpen(true)}>
            <Plus />
            {/* Add Gallery Item */}
            {heading}
          </Button>
        </div>

        <LoadingHandler
          error={error}
          loading={isFetching}
          length={data?.data.length}
          noDataMsg="No Item Has Found"
        >
          <ul className="grid grid-cols-5 gap-3">
            {data?.data.map((galleryInfo) => (
              <GalleryListItem
                isDeleting={isLoading}
                onDeleteBtnClick={() => handleDeleteBtn(galleryInfo.id)}
                onEditBtnClick={() => handleEditBtn(galleryInfo.id)}
                key={galleryInfo.id}
                asChooser={false}
                galleryItem={{
                  alt_tag: galleryInfo.alt_tag,
                  item_link: galleryInfo.item_link,
                  media_item_id: galleryInfo.media_item_id,
                  media_type: galleryInfo.media_type,
                }}
              />
            ))}
          </ul>
        </LoadingHandler>
        <div className="flex items-center justify-between">
          <LinkButton
            variant="secondary"
            href={`${currentId}?step=${
              currentStep - 1
            }&${keyName}=${currentId}`}
          >
            Previous
          </LinkButton>

          <LinkButton
            href={`${currentId}?step=${
              currentStep + 1
            }&${keyName}=${currentId}`}
          >
            Save & Next
          </LinkButton>
        </div>
      </div>
    </>
  );
}

export default AddGalleryItem;
