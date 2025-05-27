"use client";

// import { CategoryDialog } from "@/components/dialogs/CategoryDialog";
import LinkButton from "@/components/link-button";
import LoadingLayout from "@/components/LoadingLayout";
// import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/button-loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CATEGORY_TYPE } from "@/constant";
import {
  deleteACategory,
  getAllCategories,
} from "@/features/category/api/category";
import { ICategories } from "@/features/category/types";
import { IResponse } from "@/types";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Pencil, Plus, Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "react-toastify";

export default function Category() {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const route = useRouter();
  const [isPending, startTransition] = useTransition();

  const { data, error, isFetching } = useQuery<
    IResponse<ICategories[]>,
    AxiosError<IResponse>
  >({
    queryKey: ["package-categories", searchParams.get("category_type")],
    queryFn: () =>
      getAllCategories(
        searchParams.get("category_type") || CATEGORY_TYPE[0].id.toString()
      ),
  });

  if (error) {
    throw error;
  }

  const { mutate, isLoading } = useMutation<
    IResponse,
    AxiosError<IResponse>,
    number
  >({
    mutationFn: deleteACategory,
    onSuccess: (data) => {
      toast.success(data.message);
      setOpen(false);
      queryClient.invalidateQueries(["package-categories"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const currentCategoryTypeID = parseInt(
    searchParams.get("category_type") || `${CATEGORY_TYPE[0].id}`
  );

  return (
    <>
      {/* <CategoryDialog
        isOpen={open}
        setOpen={setOpen}
        category_id={categoryId}
      /> */}
      <main className="space-y-6">
        <div className="flex items-center">
          <Label className="font-semibold text-2xl flex-1">
            Package Category
          </Label>

          <div className="flex items-center gap-5">
            <Select
              onValueChange={(value) => {
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.set("category_type", value);
                route.push(`/dashboard/category?${newSearchParams.toString()}`);
              }}
            >
              <SelectTrigger>
                <SelectValue
                  defaultValue={currentCategoryTypeID.toString()}
                  placeholder={
                    CATEGORY_TYPE.find(
                      (item) => item.id === currentCategoryTypeID
                    )?.name
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {CATEGORY_TYPE.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ButtonLoading
              loading={isPending}
              onClick={() => {
                startTransition(() => {
                  route.push("/dashboard/category/0");
                });
              }}
            >
              <Plus />
              Add New Category
            </ButtonLoading>
          </div>
        </div>

        {isFetching ? (
          <LoadingLayout className="pt-20" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="w-full *:bg-primary *:text-secondary *:px-6">
                <TableHead>CATEGORY NAME</TableHead>
                <TableHead>CATEGORY TYPE</TableHead>
                <TableHead className="text-end">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((info) => (
                <TableRow key={info.category_id} className="*:px-6">
                  <TableCell className="font-medium">
                    <span>{info.category_name}</span>
                  </TableCell>
                  <TableCell>{info.category_type}</TableCell>
                  <TableCell className="flex items-center justify-end gap-3.5">
                    {/* <Button variant="default">
                      <LayoutPanelTop />
                      <span>Manage Page</span>
                    </Button> */}
                    <LinkButton
                      icon={<Pencil size={13} />}
                      href={`/dashboard/category/${info.category_id}?step=1&category_id=${info.category_id}`}
                    >
                      Edit
                    </LinkButton>
                    {/* <Button
                      onClick={() => {
                        setOpen(true);
                        setCategoryId(info.category_id);
                      }}
                    >
                      <Pencil size={13} />
                      <span>Edit</span> */}
                    {/* </Button> */}

                    <ButtonLoading
                      loading={isLoading && categoryId === info.category_id}
                      onClick={() => {
                        if (
                          !confirm(
                            "Are you sure you want to remove this category ?"
                          )
                        )
                          return;
                        setCategoryId(info.category_id);
                        mutate(info.category_id);
                      }}
                      variant="destructive"
                    >
                      <Trash size={13} />
                      <span>Delete</span>
                    </ButtonLoading>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </main>
    </>
  );
}
