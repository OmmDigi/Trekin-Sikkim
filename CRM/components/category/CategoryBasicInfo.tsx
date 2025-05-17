"use client";

import React, { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CATEGORY_TYPE } from "@/constant";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ICategories,
  ICategoryUpdate,
  TCategoryForm,
} from "@/features/category/types";
import { categoryFormSchema } from "@/features/category/categoryValidator";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IResponse } from "@/types";
import { AxiosError } from "axios";
import {
  addNewCategory,
  getSingleCategory,
  updateCategory,
} from "@/features/category/api/category";
import { toast } from "react-toastify";
import LoadingHandler from "../LoadingHandler";
import { ButtonLoading } from "../ui/button-loading";
import { useRouter } from "next/navigation";

interface IProps {
  category_id: number;
  currentStep: number;
}

export function CategoryBasicInfo({ category_id, currentStep }: IProps) {
  const [isPending, startTransition] = useTransition();
  const route = useRouter();
  const form = useForm<TCategoryForm>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      category_name: "",
      category_type: 1,
    },
  });

  const { isFetching, error } = useQuery<
    IResponse<ICategories | null>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-single-category", category_id],
    queryFn: () => getSingleCategory(category_id),
    enabled: category_id !== 0,
    onSuccess(data) {
      form.reset({
        category_name: data.data?.category_name || "",
        category_type: data.data?.category_type_id || 1,
      });
    },
  });

  const { mutate: postCategory, isLoading: isPosting } = useMutation<
    IResponse,
    AxiosError<IResponse>,
    TCategoryForm
  >({
    mutationFn: addNewCategory,
    onSuccess: (data) => {
      toast.success(data.message);
      startTransition(() => {
        route.push(
          `/dashboard/category/${category_id}?category_id=${category_id}&step=${
            currentStep + 1
          }`
        );
      });
    },
    onError: (error) => {
      const key = error.response?.data.key || "root";
      const message = error.response?.data.message;
      form.setError(key as any, { message });
    },
  });

  const { mutate: doUpdateCategory, isLoading: isUpdating } = useMutation<
    IResponse,
    AxiosError<IResponse>,
    ICategoryUpdate
  >({
    mutationFn: updateCategory,
    onSuccess: (data) => {
      toast.success(data.message);
      startTransition(() => {
        route.push(
          `/dashboard/category/${category_id}?category_id=${category_id}&step=${
            currentStep + 1
          }`
        );
      });
    },
    onError: (error) => {
      const key = error.response?.data.key || "root";
      const message = error.response?.data.message;
      form.setError(key as any, { message });
    },
  });

  function onSubmit({ category_name, category_type }: TCategoryForm) {
    if (category_id === 0) {
      postCategory({ category_name, category_type });
      return;
    }

    doUpdateCategory({
      category_id,
      new_category_name: category_name,
      new_category_type: category_type,
    });
  }

  return (
    <LoadingHandler error={error} loading={isFetching} length={1}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="category_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter package category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Type</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Choose Category Type Trek Or Tour" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORY_TYPE.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormRootError />

          <ButtonLoading loading={isUpdating || isPosting || isPending}>
            Save & Next
          </ButtonLoading>
        </form>
      </Form>
    </LoadingHandler>
  );
}
