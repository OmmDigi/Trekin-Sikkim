"use client";

import LoadingHandler from "@/components/LoadingHandler";
import { PaginationComp } from "@/components/pagination";
import { ButtonLoading } from "@/components/ui/button-loading";
import { useDoMutation } from "@/hooks/useDoMutation";
import api from "@/lib/axios";
import { BlogPost, IResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Edit, Plus, Torus, Trash } from "lucide-react";
import Image from "next/image";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useRef, useTransition } from "react";

const getArticles = async (searchParams: ReadonlyURLSearchParams) => {
  return (await api.get("/api/v1/website/blogs?" + searchParams.toString()))
    .data;
};

export default function Articles() {
  const searchParams = useSearchParams();
  const routes = useRouter();

  const currentClickedBlogId = useRef<number>(-1);
  const [isPending, startTransition] = useTransition();
  const [isDeleteing, startIsDeleteing] = useTransition();

  const { mutate } = useDoMutation();
  const { isFetching, error, data, refetch } = useQuery<
    IResponse<BlogPost[]>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-articles", searchParams.toString()],
    queryFn: () => getArticles(searchParams),
  });

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Articles</h1>
        <ButtonLoading
          onClick={() => {
            currentClickedBlogId.current = 0;
            startTransition(() => {
              routes.push("/dashboard/articles/0");
            });
          }}
          loading={isPending && currentClickedBlogId.current === 0}
        >
          <Plus />
          Add New Article
        </ButtonLoading>
      </div>
      <LoadingHandler
        loading={isFetching}
        error={error}
        length={data?.data.length}
        noDataMsg="No Articles Has Found"
      >
        <ul className="size-full space-y-5">
          {data?.data.map((blog) => (
            <li
              key={blog.blog_id}
              className="flex shadow-md w-full border rounded-2xl overflow-hidden"
            >
              <div>
                <Image
                  className="h-32 w-52 object-cover"
                  src={blog.thumbnail}
                  alt={blog.thumbnail_alt_tag || ""}
                  height={1200}
                  width={1200}
                />
              </div>
              <div className="flex-1 p-3.5 space-y-1.5">
                <h2 className="font-semibold">{blog.heading}</h2>
                <p className="line-clamp-1">{blog.meta_description}</p>

                <div className="w-full flex items-center gap-5">
                  <ButtonLoading
                    onClick={() => {
                      currentClickedBlogId.current = blog.blog_id;
                      startTransition(() => {
                        routes.push(`/dashboard/articles/${blog.blog_id}`);
                      });
                    }}
                    loading={
                      currentClickedBlogId.current === blog.blog_id && isPending
                    }
                  >
                    <Edit />
                    Edit
                  </ButtonLoading>

                  <ButtonLoading
                    loading={
                      currentClickedBlogId.current === blog.blog_id &&
                      isDeleteing
                    }
                    onClick={() => {
                      if (!confirm("Are you sure you want to delete ?")) return;
                      currentClickedBlogId.current = blog.blog_id;
                      startIsDeleteing(() => {
                        mutate({
                          apiPath: "/api/v1/website/blogs",
                          method: "delete",
                          id: blog.blog_id,
                          onSuccess() {
                            refetch();
                          },
                        });
                      });
                    }}
                    variant="destructive"
                  >
                    <Trash />
                  </ButtonLoading>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <PaginationComp
          page={parseInt(searchParams.get("page") || "1")}
          totalPage={data?.totalPage}
          onPageChange={(page) => {
            const urlSearchParams = new URLSearchParams(searchParams);
            urlSearchParams.set("page", page.toString());
            routes.push(`?${urlSearchParams.toString()}`);
          }}
        />
      </LoadingHandler>
    </div>
  );
}
