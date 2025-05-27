import React, { useState } from "react";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "../ui/dialog";
import { ButtonLoading } from "../ui/button-loading";
import {
  IPackageGallery,
  TGalleryItemRole,
} from "@/features/package/schemaAndTypes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useDoMutation } from "@/hooks/useDoMutation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { IResponse, TMediaWhereToUse } from "@/types";
import { AxiosError } from "axios";
import LoadingHandler from "../LoadingHandler";

interface IProps {
  info: TGalleryItemRole;
  setInfo: React.Dispatch<React.SetStateAction<TGalleryItemRole>>;
  getSingleItemEndPoint: string;
  putEndPoint: string;
}

const getSingleGalleryItemInfo = async (
  getSingleItemEndPoint: string,
  id: number
) => {
  return (await api.get(getSingleItemEndPoint + id)).data;
};

export default function PackageGalleryEditDialog({
  info,
  setInfo,
  getSingleItemEndPoint,
  putEndPoint,
}: IProps) {
  const [selectedOption, setSelectedOption] = useState<TMediaWhereToUse | "">(
    ""
  );

  const { isLoading, mutate } = useDoMutation();

  const { error, isFetching } = useQuery<
    IResponse<IPackageGallery>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-single-package-gallery-info"],
    queryFn: () => getSingleGalleryItemInfo(getSingleItemEndPoint, info.id),
    enabled: info.id !== 0,
    onSuccess(data) {
      setSelectedOption(data.data.where_to_use);
    },
  });

  return (
    <Dialog
      key={`${info.isOpen}`}
      open={info.isOpen}
      onOpenChange={(open) => setInfo({ isOpen: open, id: 0 })}
    >
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Use As</DialogTitle>
        </DialogHeader>

        <LoadingHandler
          error={error}
          loading={isFetching}
          noDataMsg="No Item Found"
          length={1}
        >
          <div className="w-full">
            <Select
              onValueChange={(value) =>
                setSelectedOption(value as TMediaWhereToUse)
              }
              defaultValue={selectedOption}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>

              <SelectContent className="w-full">
                <SelectGroup className="w-full">
                  <SelectItem value="thumbnail">Thumbnail Item</SelectItem>
                  <SelectItem value="gallery">Gallery Item</SelectItem>
                  <SelectItem value="banner">Banner</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <ButtonLoading
              loading={isLoading}
              onClick={() => {
                mutate({
                  apiPath: putEndPoint,
                  method: "put",
                  formData: {
                    where_to_use: selectedOption,
                  },
                  id: info.id,
                  onSuccess() {
                    setInfo({ id: info.id, isOpen: false });
                  },
                });
              }}
            >
              Save
            </ButtonLoading>
          </DialogFooter>
        </LoadingHandler>
      </DialogContent>
    </Dialog>
  );
}
