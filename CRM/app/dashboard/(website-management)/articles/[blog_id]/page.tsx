import BlogsStep from "@/components/blogs/BlogsStep";
import { Form } from "@/components/ui/form";
import React from "react";

interface IProps {
  params: Promise<{ blog_id: number }>;
  searchParams: Promise<{ step: string }>;
}

export default async function EditBlog({ params, searchParams }: IProps) {
  const blog_id = (await params).blog_id;
  const step = parseInt((await searchParams).step || "1");
  return <BlogsStep blog_id={blog_id} step={step} />;
}
