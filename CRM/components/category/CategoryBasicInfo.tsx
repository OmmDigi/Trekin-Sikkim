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
    onSuccess(data: IResponse<ICategories | null>) {
      if (data.data) {
        form.reset({
          category_name: data.data?.category_name || "",
          category_type: data.data?.category_type_id || 1,
          meta_title: data.data?.meta_title || "",
          meta_description: data.data?.meta_description || "",
          meta_keywords: data.data?.meta_keywords || "",
          canonical: data.data?.canonical || undefined,
          showinhomepage: data.data?.showinhomepage,
          category_slug: data.data?.slug || "",
          add_to_footer: data.data?.add_to_footer
        });
      }
    },
  });

  const { mutate: postCategory, isLoading: isPosting } = useMutation<
    IResponse<number>,
    AxiosError<IResponse>,
    TCategoryForm
  >({
    mutationFn: addNewCategory,
    onSuccess: (data) => {
      toast.success(data.message);
      startTransition(() => {
        route.push(
          `/dashboard/category/${data.data}?category_id=${data.data}&step=${currentStep + 1
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
          `/dashboard/category/${category_id}?category_id=${category_id}&step=${currentStep + 1
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

  function onSubmit({
    category_name,
    category_type,
    meta_title,
    meta_description,
    meta_keywords,
    canonical,
    category_slug,
    showinhomepage,
    add_to_footer,
  }: TCategoryForm) {
    if (category_id === 0) {
      postCategory({
        category_name,
        category_type,
        meta_title,
        meta_description,
        meta_keywords,
        canonical,
        category_slug,
        showinhomepage,
        add_to_footer
      });
      return;
    }

    doUpdateCategory({
      category_id,
      new_category_name: category_name,
      new_category_type: category_type,
      new_meta_title: meta_title,
      new_meta_description: meta_description,
      new_meta_keywords: meta_keywords,
      new_canonical: canonical || undefined,
      new_category_slug: category_slug,
      showinhomepage: showinhomepage,
      add_to_footer: add_to_footer
    });
  }

  return (
    <LoadingHandler
      key={`${isFetching}`}
      error={error}
      loading={isFetching}
      length={1}
    >
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
                      onChange={(event) =>
                        field.onChange(event.currentTarget.value)
                      }
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category_slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category slug"
                      onChange={(event) =>
                        field.onChange(event.currentTarget.value)
                      }
                      defaultValue={field.value}
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

            <FormField
              control={form.control}
              name="showinhomepage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Show In Home Page ?</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value === "true" ? true : false);
                    }}
                    defaultValue={field.value === true ? "true" : "false"}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Show In Home Page ?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="add_to_footer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Show In Footer ?</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value === "true" ? true : false);
                    }}
                    defaultValue={field.value === true ? "true" : "false"}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Show In Footer ?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="meta_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category page meta title"
                      onChange={(event) =>
                        field.onChange(event.currentTarget.value)
                      }
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meta_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category page meta description"
                      onChange={(event) =>
                        field.onChange(event.currentTarget.value)
                      }
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meta_keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Keywords</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category page meta keywords"
                      onChange={(event) =>
                        field.onChange(event.currentTarget.value)
                      }
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="canonical"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Canonical</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category page canonical"
                      onChange={(event) =>
                        field.onChange(event.currentTarget.value)
                      }
                      defaultValue={field.value}
                    />
                  </FormControl>
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
