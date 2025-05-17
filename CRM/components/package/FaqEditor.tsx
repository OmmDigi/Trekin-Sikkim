"use client";

import { Pencil, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";
import FaqEditorForm from "./FaqEditorForm";
import { Separator } from "../ui/separator";
import { useSearchParams } from "next/navigation";
import LinkButton from "../link-button";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { IResponse } from "@/types";
import LoadingHandler from "../LoadingHandler";
import { AxiosError } from "axios";
import { formatDateToReadable } from "../utils/formatDateToReadable";
import { IPackgeFAQ } from "@/features/package/schemaAndTypes";
import { useDoMutation } from "@/hooks/useDoMutation";
import { ButtonLoading } from "../ui/button-loading";

interface IProps {
  currentStep: number;
  keyName: "package_id" | "category_id";

  getEndpoint: string;
  postEndPoint: string;
  putEndPoint: string;
  deleteEndPoint: string;
  getSingleItemEndPoint: string;
}

const getPackageFaq = async (getEndpoint: string, id: number) => {
  return (await api.get(getEndpoint + id)).data;
};

export default function FaqEditor({
  currentStep,
  keyName,
  deleteEndPoint,
  getEndpoint,
  postEndPoint,
  putEndPoint,
  getSingleItemEndPoint,
}: IProps) {
  const searchParams = useSearchParams();

  const [formVisibility, setFormVisibility] = useState(false);
  const [currentRowId, setCurrentRowId] = useState(0);

  const currentId = parseInt(searchParams.get(keyName) || "0");

  const { data, error, isFetching, refetch } = useQuery<
    IResponse<IPackgeFAQ[]>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-package-faq"],
    queryFn: () => getPackageFaq(getEndpoint, currentId),
  });

  const { isLoading, mutate } = useDoMutation();
  const handleFaqDelete = (rowId: number) => {
    if (!confirm("Are you sure you want to delete this faq ?")) return;
    setCurrentRowId(rowId);
    mutate({
      apiPath: deleteEndPoint,
      method: "delete",
      id: rowId,
      onSuccess() {
        refetch();
      },
    });
  };

  return (
    <div className="space-y-7">
      {formVisibility ? (
        <>
          <FaqEditorForm
            setFormVisibility={setFormVisibility}
            currentRowId={currentRowId}
            getSingleItemEndPoint={getSingleItemEndPoint}
            postEndPoint={postEndPoint}
            putEndPoint={putEndPoint}
            keyName={keyName}
          />
          <Separator className="my-4" />
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">FAQ Editor</h1>

            <Button
              onClick={() => {
                setFormVisibility(true);
                setCurrentRowId(0);
              }}
            >
              <Plus />
              Add Faq
            </Button>
          </div>

          <LoadingHandler
            loading={isFetching}
            error={error}
            length={data?.data?.length}
            noDataMsg="No FAQ Has Found"
          >
            <Table>
              <TableHeader>
                <TableRow className="*:uppercase">
                  <TableHead>Faq Heading</TableHead>
                  <TableHead className="text-center">Created At</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((faq) => (
                  <TableRow key={faq.id}>
                    <TableCell className="font-medium">
                      {faq.faq_heading}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatDateToReadable(faq.created_at)}
                    </TableCell>
                    <TableCell className="text-right flex items-center justify-end gap-4">
                      <Button
                        onClick={() => {
                          setFormVisibility(true);
                          setCurrentRowId(faq.id);
                        }}
                      >
                        <Pencil size={12} />
                      </Button>
                      <ButtonLoading
                        loading={isLoading && currentRowId === faq.id}
                        onClick={() => handleFaqDelete(faq.id)}
                        variant="destructive"
                      >
                        <Trash size={12} />
                      </ButtonLoading>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
        </>
      )}
    </div>
  );
}
