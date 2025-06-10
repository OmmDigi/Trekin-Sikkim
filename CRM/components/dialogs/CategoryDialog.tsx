import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { CATEGORY_TYPE } from "@/constant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addNewCategory,
  getSingleCategory,
  updateCategory,
} from "@/features/category/api/category";
import { IResponse } from "@/types";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  ICategories,
  ICategoryUpdate,
  TCategoryForm,
} from "@/features/category/types";
import { categoryFormSchema } from "@/features/category/categoryValidator";
import { ButtonLoading } from "../ui/button-loading";
import LoadingLayout from "../LoadingLayout";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface IProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category_id: number;
}

export function CategoryDialog({ isOpen, setOpen, category_id }: IProps) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const form = useForm<TCategoryForm>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      category_name: "",
      category_type: 1,
    },
  });

  const { isFetching, error } = useQuery<IResponse<ICategories | null>>({
    queryKey: ["get-single-category", category_id],
    queryFn: () => getSingleCategory(category_id),
    enabled: category_id !== 0,
    onSuccess(data: IResponse<ICategories | null>) {
      form.reset({
        category_name: data.data?.category_name || "",
        category_type: data.data?.category_type_id || 1,
      });
    },
  });

  useEffect(() => {
    form.reset({
      category_name: "",
      category_type: parseInt(
        searchParams.get("category_type") || `${CATEGORY_TYPE[0].id}`
      ),
    });
  }, [category_id]);

  if (error) {
    throw error;
  }

  const { mutate: postCategory, isLoading: isPosting } = useMutation<
    IResponse,
    AxiosError<IResponse>,
    TCategoryForm
  >({
    mutationFn: addNewCategory,
    onSuccess: (data) => {
      toast.success(data.message);
      setOpen(false);
      queryClient.invalidateQueries(["package-categories"]);
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
      setOpen(false);
      queryClient.invalidateQueries(["package-categories"]);
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
    meta_description,
    meta_keywords,
    meta_title,
    canonical,
    category_slug,
    showinhomepage,
    add_to_footer
  }: TCategoryForm) {
    if (category_id === 0) {
      postCategory({
        category_name,
        category_type,
        meta_description,
        meta_keywords,
        meta_title,
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
      new_meta_description: meta_description,
      new_meta_title: meta_title,
      new_meta_keywords: meta_keywords,
      new_canonical: canonical,
      new_category_slug: category_slug,
      showinhomepage: showinhomepage,
      add_to_footer
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Package Category</DialogTitle>
        {isFetching ? (
          <LoadingLayout />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <ButtonLoading loading={isPosting || isUpdating} type="submit">
                  Save
                </ButtonLoading>
              </DialogFooter>

              <FormRootError />
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
