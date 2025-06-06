import React, { Dispatch, SetStateAction, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDoMutation } from "@/hooks/useDoMutation";
import { useSearchParams } from "next/navigation";
import { ButtonLoading } from "../ui/button-loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import LoadingHandler from "../LoadingHandler";
import { IResponse } from "@/types";
import { AxiosError } from "axios";
import { IPackgeFAQ } from "@/features/package/schemaAndTypes";
import { Editor } from "../Editor";

interface IProps {
  setFormVisibility: Dispatch<SetStateAction<boolean>>;
  currentRowId: number;
  postEndPoint: string;
  putEndPoint: string;
  getSingleItemEndPoint: string;
  keyName : string;
}

const faqSchema = z.object({
  faq_heading: z.string().min(1, { message: "Faq Heading Is Needed" }),
  faq_detail: z.string().min(1, { message: "Faq Details Is Needed" }),
});

type TPackageFaq = z.infer<typeof faqSchema>;

const getSingleFaq = async (getSingleItemEndPoint: string, rowId: number) => {
  return (await api.get(getSingleItemEndPoint + rowId)).data;
};

export default function FaqEditorForm({
  setFormVisibility,
  currentRowId,
  getSingleItemEndPoint,
  putEndPoint,
  postEndPoint,
  keyName
}: IProps) {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [isPending, startTransition] = useTransition();

  const currentId = parseInt(searchParams.get(keyName) || "0");
  const form = useForm<TPackageFaq>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      faq_heading: "",
      faq_detail: "",
    },
  });

  const { error, isFetching } = useQuery<
    IResponse<IPackgeFAQ>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-single-faq"],
    queryFn: () => getSingleFaq(getSingleItemEndPoint, currentRowId),
    enabled: currentRowId !== 0,
    onSuccess(data : IResponse<IPackgeFAQ>) {
      form.setValue("faq_detail", data.data.faq_detail || "No Data Has Found");
      form.setValue("faq_heading", data.data.faq_heading);
    },
  });

  const { mutate } = useDoMutation();
  const onSubmit = (values: TPackageFaq) => {
    startTransition(() => {
      if (currentRowId === 0) {
        mutate({
          apiPath: postEndPoint,
          method: "post",
          formData: {
            [keyName]: currentId,
            ...values,
          },
          onSuccess() {
            setFormVisibility(false);
            queryClient.invalidateQueries({ queryKey: ["get-package-faq"] });
          },
        });
        return;
      }

      mutate({
        apiPath: putEndPoint,
        method: "put",
        formData: {
          [keyName]: currentId,
          ...values,
        },
        id: currentRowId,
        onSuccess() {
          setFormVisibility(false);
          queryClient.invalidateQueries({ queryKey: ["get-package-faq"] });
        },
      });
    });
  };

  return (
    <>
      <Label className="text-2xl">Faq Editor</Label>
      <Separator />
      <LoadingHandler error={error} loading={isFetching} length={1}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="faq_heading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faq Heading</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter faq heading" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="faq_detail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faq Editor</FormLabel>
                  <FormControl>
                    <Editor
                      storageFolderName="faqs"
                      onBlur={(code) => {
                        field.onChange(code);
                      }}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isPending}
              type="button"
              className="mr-5"
              onClick={() => setFormVisibility(false)}
              variant="secondary"
            >
              Back
            </Button>
            <ButtonLoading loading={isPending} type="submit">
              Submit
            </ButtonLoading>
          </form>
        </Form>
      </LoadingHandler>
    </>
  );
}
