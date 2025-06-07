"use client";

import ViewDescriptionDialog from "@/components/dialogs/ViewDescriptionDialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@radix-ui/react-label";
import { Eye } from "lucide-react";
import React, { useState, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { IEnquiry, IResponse } from "@/types";
import LoadingHandler from "@/components/LoadingHandler";
import { AxiosError } from "axios";
import { PaginationComp } from "@/components/pagination";

const getEnquiryList = async (searchParams: ReadonlyURLSearchParams) =>
  (await api.get(`/api/v1/website/enquiry?${searchParams.toString()}`)).data;

export default function ContactDetails() {
  const [isOpen, setOpen] = useState(false);
  const [currentClickIndex, setCurrentClickIndex] = useState(-1);
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();

  const route = useRouter();

  const CURRENT_PAGE = parseInt(searchParams.get("page") || "1");

  const { data, error, isFetching } = useQuery<
    IResponse<IEnquiry[]>,
    AxiosError<IResponse>
  >({
    queryKey: ["enquiry-form-data", searchParams.toString()],
    queryFn: () => getEnquiryList(searchParams),
  });
  return (
    <>
      {isOpen ? (
        <ViewDescriptionDialog
          isOpen={isOpen}
          setOpen={setOpen}
          message={data?.data[currentClickIndex]?.message}
        />
      ) : null}
      <div className="space-y-3.5">
        <div>
          <Label className="text-2xl font-semibold">Contact Details</Label>
        </div>

        <LoadingHandler
          loading={isFetching}
          error={error}
          length={data?.data.length}
        >
          <Table>
            <TableCaption>
              People who have contact you from your website contact form
            </TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">DATE</TableHead>
                <TableHead>NAME</TableHead>
                <TableHead>EMAIL</TableHead>
                <TableHead>PHONE NUMBER</TableHead>
                <TableHead>NUMBER OF PERSON</TableHead>
                <TableHead>MESSAGE</TableHead>
                <TableHead className="text-right">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((info, index) => (
                <TableRow key={info.id}>
                  <TableCell>{info.created_at}</TableCell>
                  <TableCell className="font-medium">{info.name}</TableCell>
                  <TableCell>{info.email}</TableCell>
                  <TableCell>{info.contact_number}</TableCell>
                  <TableCell>{info.number_of_person}</TableCell>
                  <TableCell>
                    <span className="text-wrap line-clamp-2">
                      {info.message}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => {
                        setOpen(true);
                        setCurrentClickIndex(index);
                      }}
                    >
                      <Eye size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </LoadingHandler>

        <PaginationComp
          loading={isPending}
          onPageClick={(page) => {
            startTransition(() => {
              route.push(`/dashboard/contact-details?page=${page}`);
            });
          }}
          page={CURRENT_PAGE}
          totalPage={-1}
        />
      </div>
    </>
  );
}
