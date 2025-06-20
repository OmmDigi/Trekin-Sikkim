"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { ButtonLoading } from "../ui/button-loading";
import { useEffect, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDoMutation } from "@/hooks/useDoMutation";
import { useQueries, UseQueryResult } from "@tanstack/react-query";
import api from "@/lib/axios";
import { IResponse } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AxiosError } from "axios";
import { ICategories } from "@/features/category/types";
import { getAllCategories } from "@/features/category/api/category";
import LoadingHandler from "../LoadingHandler";
import { MultiSelect } from "../ui/multi-select";
import { IAddition } from "@/features/addition/types";

const formSchema = z.object({
  package_name: z
    .string()
    .min(2, {
      message: "Package Name must be at least 2 characters.",
    })
    .max(255),

  p_category_id: z.number().min(1, { message: "Choose Parent Category" }),

  slug: z.string().min(1, { message: "Package Slug Is Required" }),

  duration: z.string().min(1, {
    message: "Duration must be at least 2 characters.",
  }),
  short_description: z
    .string()
    .min(1, {
      message: "Short Description is required",
    })
    .max(255),

  region: z.string().min(1, { message: "Region is required" }).max(255),
  best_time: z.string().min(1, { message: "Best Time is required" }).max(255),
  highest_altitude: z
    .string()
    .min(1, { message: "Highest Altitude is required" })
    .max(255),
  suitable_for: z
    .string()
    .min(1, { message: "Suitable For is required" })
    .max(255),
  trek_distance: z
    .string()
    .min(1, { message: "Trek Distance is required" })
    .max(255),
  original_price_inr: z.coerce
    .number()
    .min(1, " must be greater than or equal to 0")
    .refine((val) => !isNaN(val), { message: "Invalid price value" }),
  offer_price_inr: z.coerce
    .number()
    .min(1, "Offer Price must be greater than or equal to 0")
    .refine((val) => !isNaN(val), { message: "Invalid price value" }),

  original_price_usd: z.coerce
    .number()
    .min(0.1, "Original price must be greater than or equal to 0")
    .refine((val) => !isNaN(val), { message: "Invalid price value" }),
  offer_price_usd: z.coerce
    .number()
    .min(0.1, "Offer Price must be greater than or equal to 0")
    .refine((val) => !isNaN(val), { message: "Invalid price value" }),

  // category_id: z.number().min(1, { message: "Please Choose The Category" }),
  is_active: z.number(),

  additionals: z.array(z.number()).optional(),
});

type FormType = z.infer<typeof formSchema>;

interface IBasicInfoResponse extends FormType {
  id: number;
}

interface IProps {
  currentStep: number;
}

const getSingleBasicInfo = async (package_id: number) => {
  return (await api.get("/api/v1/package/basic/" + package_id)).data;
};

const getAdditionalList = async () => {
  return (await api.get("/api/v1/addition")).data;
};

export default function BasicInfo({ currentStep }: IProps) {
  const params = useParams<{ slug: string }>();
  const packageId = parseInt(params.slug);

  return (
    <BasicInfoFunc
      key={packageId}
      packageId={packageId}
      currentStep={currentStep}
    />
  );
}

interface IBasicInfoFunc {
  packageId: number;
  currentStep: number;
}

function BasicInfoFunc({ packageId, currentStep }: IBasicInfoFunc) {
  const [isPending, startTransition] = useTransition();
  const route = useRouter();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      package_name: "",
      slug: "",
      short_description: "",
      duration: "",
      best_time: "",
      highest_altitude: "",
      offer_price_inr: 0.0,
      original_price_inr: 0.0,
      original_price_usd: 0.0,
      offer_price_usd: 0.0,
      region: "",
      suitable_for: "",
      trek_distance: "",
      p_category_id: 0,
      is_active: 1,
      additionals: [],
    },
  });
  const { mutate } = useDoMutation(
    () => {},
    (error) => {
      const key = error.response?.data.key;
      if (!key) {
        form.setError("root", { message: error.response?.data.message });
      } else {
        form.setError(key as any, { message: error.response?.data.message });
      }
    }
  );

  const apiResult = useQueries<
    [
      UseQueryResult<IResponse<IBasicInfoResponse>, AxiosError<IResponse>>,
      UseQueryResult<IResponse<IAddition[]>, AxiosError<IResponse>>,
      UseQueryResult<IResponse<ICategories[]>, AxiosError<IResponse>>
    ]
  >({
    queries: [
      {
        queryKey: ["get-one-package-basic-info", packageId],
        enabled: packageId !== 0,
        refetchOnMount: true,
        queryFn: () => getSingleBasicInfo(packageId),
      },

      {
        queryKey: ["get-additionals", packageId],
        queryFn: getAdditionalList,
      },

      {
        queryKey: ["package-categories", packageId],
        queryFn: () => getAllCategories(),
      },
    ],
  });

  function onSubmit(values: FormType) {
    if (packageId === 0) {
      startTransition(() => {
        mutate({
          apiPath: "/api/v1/package/basic",
          method: "post",
          formData: values,
          onSuccess(data) {
            route.push(
              `/dashboard/packages/1?step=${currentStep + 1}&package_id=${
                data.data
              }`
            );
          },
        });
      });
      return;
    }

    startTransition(() => {
      mutate({
        apiPath: "/api/v1/package/basic",
        method: "put",
        formData: values,
        id: packageId,
        onSuccess(data) {
          route.push(
            `/dashboard/packages/${packageId}?step=${
              currentStep + 1
            }&package_id=${data.data}`
          );
        },
      });
    });
  }

  useEffect(() => {
    const data = apiResult[0].data?.data;
    if (data) {
      form.reset({
        package_name: data.package_name,
        short_description: data.short_description,
        duration: data.duration,
        best_time: data.best_time,
        highest_altitude: data.highest_altitude,
        offer_price_inr: data.offer_price_inr,
        original_price_inr: data.original_price_inr,
        original_price_usd: data.offer_price_usd,
        offer_price_usd: data.offer_price_usd,
        region: data.region,
        suitable_for: data.suitable_for,
        trek_distance: data.trek_distance,
        is_active: data.is_active,
        additionals: data.additionals,
        slug: data.slug,
        p_category_id: data.p_category_id ?? 0,
      });
    }
  }, [apiResult[0].isSuccess, apiResult[1].isSuccess, apiResult[2].isSuccess]);

  return (
    <LoadingHandler
      loading={apiResult[0].isFetching}
      error={apiResult[0].error}
      length={1}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(formSchema.shape).map(([key]) => {
              if (
                // key === "category_id" ||
                key === "is_active" ||
                key === "additionals" ||
                key === "p_category_id"
              )
                return null;
              const keyName = key.replace(/_/g, " ");
              return (
                <FormField
                  key={key}
                  control={form.control}
                  name={key as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{keyName.toUpperCase()}</FormLabel>
                      <FormControl>
                        <Input placeholder={`Enter ${keyName}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IS ACTIVE</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value.toString()}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          className="w-full"
                          placeholder="Choose Is Active Or Not"
                          defaultValue={"1"}
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value={"1"}>Yes</SelectItem>
                        <SelectItem value={"0"}>No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingHandler
              loading={apiResult[1].isFetching}
              error={apiResult[1].error}
              length={apiResult[1].data?.data.length}
              noDataMsg="No Additional Item Found"
            >
              <FormField
                control={form.control}
                name="additionals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CHOOSE ADDITIONALS</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={
                          apiResult[1].data?.data.map((item) => ({
                            label: `${item.additional_name} (₹${item.price_inr}), ($${item.price_usd})`,
                            value: item.additional_id,
                          })) || []
                        }
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        defaultValue={field?.value || []}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LoadingHandler>

            <LoadingHandler
              loading={apiResult[2].isFetching}
              error={apiResult[2].error}
              length={apiResult[2].data?.data.length}
              noDataMsg="No Category Found"
            >
              <FormField
                control={form.control}
                name="p_category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CHOOSE PARENT CATEGORY *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        defaultValue={field.value?.toString()}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            className="w-full"
                            placeholder="Choose Parent Category"
                          />
                        </SelectTrigger>

                        <SelectContent>
                          {apiResult[2].data?.data.map((category) => (
                            <SelectItem
                              key={category.category_id}
                              value={category.category_id.toString()}
                            >
                              {category.category_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LoadingHandler>
          </div>
          <FormRootError />
          <div className="flex items-center justify-between">
            <ButtonLoading loading={isPending}>Save & Next</ButtonLoading>
          </div>
        </form>
      </Form>
    </LoadingHandler>
  );
}
