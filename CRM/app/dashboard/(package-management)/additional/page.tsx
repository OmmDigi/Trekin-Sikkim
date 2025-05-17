"use client";

import AdditionalDialog from "@/components/dialogs/AdditionalDialog";
import LoadingLayout from "@/components/LoadingLayout";
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/button-loading";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdditions } from "@/features/addition/api/addition";
import { IAddition } from "@/features/addition/types";
import { useDoMutation } from "@/hooks/useDoMutation";
import { IResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Pencil, Plus, Trash } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";


export default function Additionals() {
  const [isOpen, setIsOpen] = useState(false);
  const [additionId, setAdditionId] = useState(0);

  const searchParams = useSearchParams();

  const { data, error, isFetching } = useQuery<
    IResponse<IAddition[]>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-additionals", searchParams.toString()],
    queryFn: () => getAdditions(parseInt(searchParams.get("page") || "1")),
  });


  if (error) {
    throw error;
  }

  const { isLoading, mutate } = useDoMutation();

  return (
    <>
      <AdditionalDialog additional_id={additionId} isOpen={isOpen} setOpen={setIsOpen} />
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <Label className="text-2xl">Package Additionals</Label>

          <Button onClick={() => {
            setIsOpen(true)
            setAdditionId(0)
          }}>
            <Plus />
            Add New Additional
          </Button>
        </div>
        {isFetching ? (
          <LoadingLayout className="pt-20" />
        ) : <Table>
          <TableCaption>A list of additional prices</TableCaption>
          <TableHeader>
            <TableRow className="*:uppercase">
              <TableHead>Name</TableHead>
              <TableHead>Price INR</TableHead>
              <TableHead>Price USD</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((info) => (
              <TableRow key={info.additional_id}>
                <TableCell className="font-medium">{info.additional_name}</TableCell>
                <TableCell>₹{info.price_inr}</TableCell>
                <TableCell>${info.price_usd}</TableCell>
                <TableCell className="text-right">
                  <Button onClick={() => {
                    setAdditionId(info.additional_id);
                    setIsOpen(true);
                  }} className="mr-2.5">
                    <Pencil />
                  </Button>
                  <ButtonLoading loading={isLoading && additionId === info.additional_id} onClick={() => {
                    if (
                      !confirm(
                        "Are you sure you want to remove this media item ?"
                      )
                    )
                      return;

                    setAdditionId(info.additional_id)

                    mutate({
                      apiPath: "/api/v1/addition",
                      method: "delete",
                      id: info.additional_id
                    })
                  }} variant="destructive">
                    <Trash />
                  </ButtonLoading>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>}

      </div>
    </>
  );
}
