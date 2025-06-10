import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { CircleCheckBig } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { IResponse } from "@/types";
import { AxiosError } from "axios";
import LoadingHandler from "../LoadingHandler";
import { PaginationComp } from "../pagination";
import { ButtonLoading } from "../ui/button-loading";
import { IPackageList } from "@/features/package/schemaAndTypes";

interface IProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  onDoneBtnClick?: (selectedIds: number[]) => void;
  isSubmitting?: boolean;
}

const getPackageList = async (page: number) =>
  (await api.get(`/api/v1/package?page=${page}`)).data;

export default function ChoosePackagesDialog({ isOpen, setOpen, onDoneBtnClick, isSubmitting = false }: IProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const selectedPackages = useRef<Map<number, boolean>>(new Map());

  const { data, isFetching, error } = useQuery<
    IResponse<IPackageList[]>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-packages-list", currentPage],
    queryFn: () => getPackageList(currentPage),
  });
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose Packages</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-end">
          <ButtonLoading loading={isSubmitting} onClick={() => {
            const selectedIds = Array.from(selectedPackages.current.keys());
            onDoneBtnClick?.(selectedIds)
          }}>
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
                <li key={item.id} className="flex items-start gap-3">
                  <div className="flex items-center gap-3.5">
                    <Checkbox
                      className="cursor-pointer border-1 border-green-600"
                      defaultChecked={selectedPackages.current.has(item.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          selectedPackages.current.set(item.id, true);
                        } else {
                          selectedPackages.current.delete(item.id);
                        }
                      }}
                    />
                    <Image
                      className="w-20 aspect-video object-cover"
                      alt=""
                      src={item.thumbnail || "/placeholder-image.jpg"}
                      width={1200}
                      height={1200}
                    />
                  </div>

                  <h2 className="font-semibold leading-none line-clamp-1">
                    {item.package_name}
                  </h2>
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
