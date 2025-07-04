"use client";

import api from "@/lib/axios";
import { cn } from "@/lib/utils";
import { setEditCommentState } from "@/redux/slices/editComment.slice";
import { IResponse } from "@/types";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface IProps {
  comment_id: number;
  comment_content: string;
}

export default function BlogCommentAction({
  comment_id,
  comment_content,
}: IProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const dispatch = useDispatch();

  const [isPending, startTransition] = useTransition();
  const route = useRouter();

  const handleDeleteButton = () => {
    if (!confirm("Are you sure you want to remove this comment ?")) return;

    startTransition(async () => {
      try {
        const { data } = await api.delete<IResponse<{ comment_id: number }>>(
          `/api/v1/website/blogs/comment/${comment_id}`
        );
        toast.success(data.message);
        route.push(`?comment_id=${data.data.comment_id}`, { scroll: false });
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while removing your comment");
      }
    });
  };

  const handleEditCommentButton = () => {
    dispatch(
      setEditCommentState({
        comment_id: comment_id,
        content: comment_content.replace("<p>", "").replace("</p>", ""),
      })
    );
    route.push("#comment_heading");
    setIsDropDownOpen(false);
  };

  return (
    <>
      <button
        onClick={() => {
          setIsDropDownOpen(!isDropDownOpen);
        }}
        id="dropdownComment1Button"
        data-dropdown-toggle="dropdownComment1"
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
        <span className="sr-only">Comment settings</span>
      </button>
      <div
        className={cn(
          isDropDownOpen ? "" : "hidden",
          "z-10 absolute right-0 top-16 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        )}
      >
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconHorizontalButton"
        >
          <li className="w-full">
            <button
              onClick={handleEditCommentButton}
              className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Edit
            </button>
          </li>
          <li className="w-full">
            <button
              onClick={handleDeleteButton}
              className="block w-full py-2 text-left px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "Remove"
              )}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
