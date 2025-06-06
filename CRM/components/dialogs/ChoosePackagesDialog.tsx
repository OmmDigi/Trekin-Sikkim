import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { CircleCheckBig, Layers2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { IResponse } from "@/types";
import { AxiosError } from "axios";
import LoadingHandler from "../LoadingHandler";
import { PaginationComp } from "../pagination";
import { Button } from "../ui/button";
import { useDoMutation } from "@/hooks/useDoMutation";
import { ButtonLoading } from "../ui/button-loading";

interface IProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const getPackageListForUpcomingPackge = async (page: number) =>
  (await api.get(`/api/v1/upcoming/package-list?page=${page}`)).data;

type IList = {
  package_id: number;
  package_name: string;
  category_name: string;
  item_link: string | null;
  is_selected: boolean;
};

export default function ChoosePackagesDialog({ isOpen, setOpen }: IProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedItem, setSelectedItems] = useState<number[]>([]);

  const { data, isFetching, error } = useQuery<
    IResponse<IList[]>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-package-list-for-upcoming-package", currentPage],
    queryFn: () => getPackageListForUpcomingPackge(currentPage),
    onSuccess(data : IResponse<IList[]>) {
      const alreadySelectedIds: number[] = [];
      data.data.forEach((item) => {
        if (item.is_selected) {
          alreadySelectedIds.push(item.package_id);
        }
      });
      setSelectedItems(alreadySelectedIds);
    },
  });

  const { isLoading, mutate } = useDoMutation();
  const onDoneBtnClick = () => {
    mutate({
      apiPath: "/api/v1/upcoming/modify",
      method: "post",
      formData: selectedItem,
      onSuccess() {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose Package</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-end">
          <ButtonLoading loading={isLoading} onClick={onDoneBtnClick}>
            <CircleCheckBig />
            Done
          </ButtonLoading>
        </div>

        <LoadingHandler
          error={error}
          loading={isFetching}
          length={data?.data.length}
        >
          <ScrollArea className="max-h-[60vh]">
            <ul className="space-y-4">
              {data?.data.map((item) => (
                <li key={item.package_id} className="flex items-start gap-3">
                  <div className="flex items-center gap-3.5">
                    <Checkbox
                      className="cursor-pointer border-1 border-green-600"
                      defaultChecked={item.is_selected}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          const prevItems = [...selectedItem];
                          prevItems.push(item.package_id);
                          setSelectedItems(prevItems);
                          return;
                        }

                        const filteredItems = selectedItem.filter(
                          (id) => id !== item.package_id
                        );
                        setSelectedItems(filteredItems);
                      }}
                    />
                    <Image
                      className="w-20 aspect-video object-cover"
                      alt=""
                      src={item.item_link || "/placeholder-image.jpg"}
                      width={1200}
                      height={1200}
                    />
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-semibold leading-none">
                      {item.package_name}
                    </h2>
                    <div className="flex items-center gap-1">
                      <Layers2 size={12} />
                      <span className="text-sm text-gray-500">
                        {item.category_name}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>

          <PaginationComp
            totalPage={data?.totalPage}
            page={currentPage}
            onPageClick={(page) => setCurrentPage(page)}
          />
        </LoadingHandler>
      </DialogContent>
    </Dialog>
  );
}
