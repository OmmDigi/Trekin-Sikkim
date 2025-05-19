"use client";

import LoadingHandler from "@/components/LoadingHandler";
import { PaginationComp } from "@/components/pagination";
import { ButtonLoading } from "@/components/ui/button-loading";
import api from "@/lib/axios";
import { BlogPost, IResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Edit, Plus } from "lucide-react";
import Image from "next/image";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useTransition } from "react";

const getArticles = async (searchParams: ReadonlyURLSearchParams) => {
  return (await api.get("/api/v1/website/blogs?" + searchParams.toString()))
    .data;
};

export default function Articles() {
  const searchParams = useSearchParams();
  const routes = useRouter();

  const [isPending, startTransition] = useTransition();

  const { isFetching, error, data } = useQuery<
    IResponse<BlogPost[]>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-articles", searchParams.toString()],
    queryFn: () => getArticles(searchParams),
  });

  return (
    <div className="size-full space-y-3.5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Articles</h1>
        <ButtonLoading
          onClick={() => {
            startTransition(() => {
              routes.push("/dashboard/articles/0");
            });
          }}
          loading={isPending}
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
        <ul className="size-full">
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
                <h2 className="font-semibold">This is the blog title</h2>
                <p className="line-clamp-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  esse quos itaque. Aut excepturi cumque debitis dolorum numquam
                  quibusdam accusamus cum, ea distinctio repellendus maiores
                  officiis, nihil, labore dolor blanditiis!
                </p>

                <div className="w-full">
                  <ButtonLoading
                    onClick={() => {
                      startTransition(() => {
                        routes.push(`/dashboard/articles/${blog.blog_id}`);
                      });
                    }}
                    loading={isPending}
                  >
                    <Edit />
                    Edit
                  </ButtonLoading>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <PaginationComp
          page={parseInt(searchParams.get("page") || "1")}
          totalPage={data?.totalPage}
        />
      </LoadingHandler>
    </div>
  );
}
