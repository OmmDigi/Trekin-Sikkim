import { useRouter, useSearchParams } from "next/navigation";
import LinkButton from "../link-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useDoMutation } from "@/hooks/useDoMutation";
import { ButtonLoading } from "../ui/button-loading";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import LoadingHandler from "../LoadingHandler";
import { IResponse } from "@/types";
import { AxiosError } from "axios";

interface IProps {
  currentStep: number;
}

const seoFormSchema = z.object({
  meta_title: z.string().min(1),
  meta_description: z.string().min(1),
  meta_keywords: z.string().min(1),
  canonical: z.string().optional(),
});

type ISeoForm = z.infer<typeof seoFormSchema>;

const getSinglePackageSeo = async (package_id: number) => {
  return (await api.get(`/api/v1/package/seo/${package_id}`)).data;
};

export default function MangeSeoItem({ currentStep }: IProps) {
  const searchParams = useSearchParams();
  const packageId = parseInt(searchParams.get("package_id") || "0");

  return (
    <ManageSeoForm
      key={packageId}
      packageId={packageId}
      currentStep={currentStep}
    />
  );
}

interface IManageSeoForm {
  packageId: number;
  currentStep: number;
}

interface IPacakgeSeo {
  package_id: number;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  canonical: null | string;
}

function ManageSeoForm({ packageId, currentStep }: IManageSeoForm) {
  const routes = useRouter();

  const form = useForm<ISeoForm>({
    resolver: zodResolver(seoFormSchema),
  });

  const { error, isFetching } = useQuery<
    IResponse<IPacakgeSeo | undefined>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-single-packge-seo", packageId],
    queryFn: () => getSinglePackageSeo(packageId),
    enabled: packageId !== 0,
    onSuccess(data) {
      form.reset({
        meta_title: data.data?.meta_title,
        meta_description: data.data?.meta_description,
        meta_keywords: data.data?.meta_keywords,
        canonical: data.data?.canonical || undefined,
      });
    },
  });

  const { isLoading, mutate } = useDoMutation();
  const onSubmit = (formData: ISeoForm) => {
    mutate({
      apiPath: `/api/v1/package/seo`,
      method: "post",
      formData: {
        package_id: packageId,
        ...formData,
      },
      onSuccess() {
        routes.push(
          `${packageId}?step=${currentStep + 1}&package_id=${packageId}`
        );
      },
    });
  };

  return (
    <LoadingHandler error={error} loading={isFetching} length={1}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-5 mb-4">
            <FormField
              control={form.control}
              name={"meta_title"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter meta title"
                      onChange={(e) =>
                        field.onChange(e.currentTarget.value || "")
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
              name={"meta_description"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter meta description"
                      onChange={(e) =>
                        field.onChange(e.currentTarget.value || "")
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
              name={"meta_keywords"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Keywords *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter meta keywords"
                      onChange={(e) =>
                        field.onChange(e.currentTarget.value || "")
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
              name={"canonical"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Canonical</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter canonical"
                      onChange={(e) =>
                        field.onChange(e.currentTarget.value || "")
                      }
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-between">
            <LinkButton
              variant="secondary"
              href={`${packageId}?step=${
                currentStep - 1
              }&package_id=${packageId}`}
            >
              Previous
            </LinkButton>

            <ButtonLoading loading={isLoading}>Save & Next</ButtonLoading>
          </div>
        </form>
      </Form>
    </LoadingHandler>
  );
}
