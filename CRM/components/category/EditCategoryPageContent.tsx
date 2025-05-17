import React, { FormEvent, useRef, useTransition } from "react";
import { Editor } from "../Editor";
import { useDoMutation } from "@/hooks/useDoMutation";
import { useRouter, useSearchParams } from "next/navigation";
import { ButtonLoading } from "../ui/button-loading";
import LinkButton from "../link-button";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import LoadingHandler from "../LoadingHandler";
import { IResponse } from "@/types";
import { AxiosError } from "axios";

interface IProps {
  currentStep: number;
}

const getSingleCategoryPageContent = async (category_id: number) =>
  (await api.get("/api/v1/category/page-contant/" + category_id)).data;

interface ICategoryPageContent {
  category_id: number;
  page_content: string;
}

export default function EditCategoryPageContent({ currentStep }: IProps) {
  const editorData = useRef<string>("");
  const searchParams = useSearchParams();

  const { isLoading, mutate } = useDoMutation();
  const [isPending, startTransition] = useTransition();
  const routes = useRouter();
  const category_id = parseInt(searchParams.get("category_id") || "0");

  const { error, isFetching } = useQuery<
    IResponse<ICategoryPageContent | undefined>,
    AxiosError<IResponse>
  >({
    queryKey: ["category-page-content", category_id],
    queryFn: () => getSingleCategoryPageContent(category_id),
    onSuccess(data) {
      editorData.current = data.data?.page_content || "NO DATA";
    },
  });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    mutate({
      apiPath: "/api/v1/category/page-contant",
      method: "post",
      formData: {
        category_id: category_id,
        page_content: editorData.current,
      },
      onSuccess() {
        startTransition(() => {
          routes.push("/dashboard/category");
        });
      },
    });
  };

  return (
    <LoadingHandler error={error} loading={isFetching} length={1}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Editor
          storageFolderName="category-page-content"
          onBlur={(code) => (editorData.current = code)}
          defaultValue={editorData.current}
        />

        <div className="flex items-center justify-between">
          <LinkButton
            type="button"
            variant="secondary"
            href={`${category_id}?step=${
              currentStep - 1
            }&category_id=${category_id}`}
          >
            Previous
          </LinkButton>

          <ButtonLoading loading={isLoading || isPending}>Submit</ButtonLoading>
        </div>
      </form>
    </LoadingHandler>
  );
}
