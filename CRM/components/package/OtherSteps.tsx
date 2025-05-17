import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Pencil, Plus, Trash } from "lucide-react";
import AddOtherOptionForm from "./AddOtherOptionForm";
import LinkButton from "../link-button";
import { useQuery } from "@tanstack/react-query";
import { IResponse } from "@/types";
import { AxiosError } from "axios";
import { IPackageOtherOption } from "@/features/package/schemaAndTypes";
import api from "@/lib/axios";
import LoadingHandler from "../LoadingHandler";
import { useDoMutation } from "@/hooks/useDoMutation";
import { ButtonLoading } from "../ui/button-loading";

interface IProps {
  currentStep: number;
}

const getPackageOtherOption = async (package_id: number) =>
  (await api.get("/api/v1/package/other/" + package_id)).data;

export default function OtherSteps({ currentStep }: IProps) {
  const searchParams = useSearchParams();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [otherId, setOtherId] = useState(0);

  const packageId = parseInt(searchParams.get("package_id") || "0");

  const { data, error, isFetching, refetch } = useQuery<
    IResponse<IPackageOtherOption[]>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-package-other-option-list"],
    queryFn: () => getPackageOtherOption(packageId),
  });

  const { isLoading, mutate } = useDoMutation();
  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this option ?")) return;
    mutate({
      apiPath: "/api/v1/package/other",
      id: id,
      method: "delete",
      onSuccess() {
        refetch();
      },
    });
  };

  return isFormOpen ? (
    <AddOtherOptionForm setIsFormOpen={setIsFormOpen} id={otherId} />
  ) : (
    <div className="space-y-7">
      <div className="flex items-center justify-end">
        <Button
          onClick={() => {
            setIsFormOpen(true);
            setOtherId(0);
          }}
          type="button"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Other Option
        </Button>
      </div>

      <LoadingHandler
        error={error}
        loading={isFetching}
        length={data?.data.length}
        noDataMsg="No Other Options Found"
      >
        <Table>
          <TableHeader>
            <TableRow className="*:uppercase">
              <TableHead>Other Options</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((option) => (
              <TableRow key={option.id}>
                <TableCell className="font-medium">
                  {option.option_name}
                </TableCell>
                <TableCell className="text-right flex items-center justify-end gap-4">
                  <Button
                    onClick={() => {
                      setIsFormOpen(true);
                      setOtherId(option.id);
                    }}
                  >
                    <Pencil size={12} />
                  </Button>
                  <ButtonLoading
                    loading={isLoading}
                    onClick={() => handleDelete(option.id)}
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
          href={`${packageId}?step=${currentStep - 1}&package_id=${packageId}`}
        >
          Previous
        </LinkButton>

        <LinkButton
          href={"/dashboard/packages"}
        >
          Save & Exit
        </LinkButton>
      </div>
    </div>
  );
}
