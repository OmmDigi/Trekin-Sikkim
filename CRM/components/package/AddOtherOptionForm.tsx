import React, { Dispatch, SetStateAction, useRef } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Editor } from "../Editor";
import { TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDoMutation } from "@/hooks/useDoMutation";
import { useSearchParams } from "next/navigation";
import { ButtonLoading } from "../ui/button-loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import LoadingHandler from "../LoadingHandler";
import { IResponse } from "@/types";
import { IPackageOtherOption } from "@/features/package/schemaAndTypes";
import { AxiosError } from "axios";

interface IProps {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
}

const otherOptionSchema = z.object({
  option_name: z.string().min(1, { message: "Option Name Is Required" }),
  option_content: z.string().min(1, { message: "Option Content Is Required" }),
});

type TOtherOption = z.infer<typeof otherOptionSchema>;

const getSingleOtherOption = async (id: number) =>
  (await api.get("/api/v1/package/other-one/" + id)).data;

function AddOtherOptionForm({ setIsFormOpen, id }: IProps) {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const packageId = parseInt(searchParams.get("package_id") || "0");
  const form = useForm<TOtherOption>({
    resolver: zodResolver(otherOptionSchema),
    defaultValues: {
      option_name: "",
      option_content: "",
    },
  });

  const { error, isFetching } = useQuery<
    IResponse<IPackageOtherOption>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-single-other-option"],
    queryFn: () => getSingleOtherOption(id),
    enabled: id !== 0,
    onSuccess(data : IResponse<IPackageOtherOption>) {
      form.reset({
        option_content: data.data.option_content || "",
        option_name: data.data.option_name,
      });
    },
  });

  const { isLoading, mutate } = useDoMutation();
  const onSubmit = (values: TOtherOption) => {
    if (id === 0) {
      mutate({
        apiPath: "/api/v1/package/other",
        method: "post",
        formData: {
          package_id: packageId,
          ...values,
        },
        onSuccess() {
          setIsFormOpen(false);
          queryClient.invalidateQueries({
            queryKey: ["get-package-other-option-list"],
          });
        },
      });

      return;
    }

    mutate({
      apiPath: "/api/v1/package/other",
      method: "put",
      formData: {
        package_id: packageId,
        ...values,
      },
      id: id,
      onSuccess() {
        setIsFormOpen(false);
        queryClient.invalidateQueries({
          queryKey: ["get-package-other-option-list"],
        });
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-2xl">Other Options</Label>
        <Separator />
      </div>

      <LoadingHandler error={error} loading={isFetching} length={1}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="option_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Option Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter other option name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="option_content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content To Add</FormLabel>
                  <FormControl>
                    <Editor
                      storageFolderName="other-content"
                      onBlur={code => field.onChange(code)}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              className="mr-5"
              onClick={() => setIsFormOpen(false)}
              variant="secondary"
            >
              Back
            </Button>
            <ButtonLoading loading={isLoading}>Submit</ButtonLoading>
          </form>
        </Form>
      </LoadingHandler>
    </div>
  );
}

export default AddOtherOptionForm;
