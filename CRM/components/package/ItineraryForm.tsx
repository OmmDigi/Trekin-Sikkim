import React, { Dispatch, SetStateAction, useTransition } from "react";
import { Label } from "../ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Editor } from "../Editor";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDoMutation } from "@/hooks/useDoMutation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ButtonLoading } from "../ui/button-loading";
import { IResponse } from "@/types";
import { AxiosError } from "axios";
import api from "@/lib/axios";
import { IPackgeItinerary } from "@/features/package/schemaAndTypes";
import LoadingHandler from "../LoadingHandler";

interface IProps {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  itinerayId: number;
}

const itineryFormSchema = z.object({
  itinerary_heading: z
    .string()
    .min(1, { message: "Itinerary Heading Is Required" }),
  itinerary_subheading: z
    .string()
    .min(1, { message: "Itinerary Subheading Is Required" }),
  itinerary_details: z
    .string()
    .min(1, { message: "Itinerary Details Is Required" }),
});

type TItineryForm = z.infer<typeof itineryFormSchema>;

const getSingleItinerary = async (itineraryId: number) => {
  return (await api.get("/api/v1/package/itinerary-one/" + itineraryId)).data;
};

export default function ItineraryForm({ setIsFormOpen, itinerayId }: IProps) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const form = useForm<TItineryForm>({
    resolver: zodResolver(itineryFormSchema),
    defaultValues: {
      itinerary_details: "",
      itinerary_heading: "",
      itinerary_subheading: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const packageId = parseInt(searchParams.get("package_id") || "0");

  const { error, isFetching } = useQuery<
    IResponse<IPackgeItinerary>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-single-faq"],
    queryFn: () => getSingleItinerary(itinerayId),
    enabled: itinerayId !== 0,
    onSuccess(data: IResponse<IPackgeItinerary>) {
      form.setValue("itinerary_details", data.data.itinerary_details || "");
      form.setValue("itinerary_heading", data.data.itinerary_heading);
      form.setValue("itinerary_subheading", data.data.itinerary_subheading);
    },
  });

  const { mutate } = useDoMutation();
  const onSubmit = (values: TItineryForm) => {
    startTransition(() => {
      if (itinerayId === 0) {
        mutate({
          apiPath: "/api/v1/package/itinerary",
          method: "post",
          formData: {
            package_id: packageId,
            ...values,
          },
          onSuccess() {
            setIsFormOpen(false);
            queryClient.invalidateQueries({
              queryKey: ["get-package-itinerary"],
            });
          },
        });
        return;
      }

      mutate({
        apiPath: "/api/v1/package/itinerary",
        method: "put",
        formData: {
          package_id: packageId,
          ...values,
        },
        id: itinerayId,
        onSuccess() {
          setIsFormOpen(false);
          queryClient.invalidateQueries({
            queryKey: ["get-package-itinerary"],
          });
        },
      });
    });
  };

  return (
    <div className="space-y-4">
      <Label className="text-2xl">Itinerary Editor</Label>
      <Separator />
      <LoadingHandler loading={isFetching} error={error} length={1}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="itinerary_heading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heading</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter heading" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="itinerary_subheading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subheading</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter subheading" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="itinerary_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Editor
                      storageFolderName="itinerary"
                      onBlur={(code) => field.onChange(code)}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              onClick={() => setIsFormOpen(false)}
              className="mr-3"
              variant="secondary"
              type="button"
              disabled={isPending}
            >
              Back
            </Button>

            <ButtonLoading loading={isPending}>Save</ButtonLoading>
          </form>
        </Form>
      </LoadingHandler>
    </div>
  );
}
