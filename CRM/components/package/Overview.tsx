import { useRouter, useSearchParams } from "next/navigation";
import LinkButton from "../link-button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "../Editor";
import { ButtonLoading } from "../ui/button-loading";
import { useDoMutation } from "@/hooks/useDoMutation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import LoadingHandler from "../LoadingHandler";
import { IResponse } from "@/types";
import { AxiosError } from "axios";

interface IProps {
  currentStep: number;
}

const overviewFormSchema = z.object({
  overview: z.string().min(1, { message: "Overview is required" }),
});

type TOverviewForm = z.infer<typeof overviewFormSchema>;

const getPackageOverview = async (package_id: number) => {
  return (await api.get("/api/v1/package/overview/" + package_id)).data;
};

interface IOverview {
  package_id?: number;
  overview?: string;
}

function Overview({ currentStep }: IProps) {
  const searchParams = useSearchParams();
  const routes = useRouter();

  const packageId = parseInt(searchParams.get("package_id") || "0");

  const form = useForm<TOverviewForm>({
    resolver: zodResolver(overviewFormSchema),
    defaultValues: {
      overview: "",
    },
  });

  const { isFetching, error } = useQuery<
    IResponse<IOverview>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-package-overview", packageId],
    queryFn: () => getPackageOverview(packageId),
    onSuccess(data : IResponse<IOverview>) {
      form.setValue("overview", data.data?.overview || "");
    },
  });

  const { isLoading, mutate } = useDoMutation();
  const onSubmit = (values: TOverviewForm) => {
    mutate({
      apiPath: "/api/v1/package/overview",
      method: "post",
      formData: {
        package_id: packageId,
        ...values,
      },
      onSuccess() {
        routes.push(
          `${packageId}?step=${currentStep + 1}&package_id=${packageId}`
        );
      },
    });
  };

  return (
    <div>
      <LoadingHandler loading={isFetching} error={error} length={1}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="overview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overview</FormLabel>
                  <FormControl>
                    <Editor
                      onBlur={(code) => {
                        field.onChange(code)
                      }}
                      storageFolderName="overview"
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <LinkButton
                variant="secondary"
                type="button"
                href={`${packageId}?step=${
                  currentStep - 1
                }&package_id=${packageId}`}
              >
                Previous
              </LinkButton>

              <ButtonLoading loading={isLoading}>Save & Next</ButtonLoading>

              {/* <LinkButton
              type="submit"
              href={`${packageId}?step=${
                currentStep + 1
              }&package_id=${packageId}`}
            >
              Save & Next
            </LinkButton> */}
            </div>
          </form>
        </Form>
      </LoadingHandler>
    </div>
  );
}

export default Overview;
