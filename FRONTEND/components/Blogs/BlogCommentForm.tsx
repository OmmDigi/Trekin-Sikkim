"use client";

import api from "@/lib/axios";
import Button from "../Button";
import { useEffect, useRef, useTransition } from "react";
import { toast } from "react-toastify";
import { IResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setEditCommentState } from "@/redux/slices/editComment.slice";

interface IProps {
  blog_id: number;
}

export default function BlogCommentForm({ blog_id }: IProps) {
  const [isPendingEdit, startTransitionEdit] = useTransition();
  const [isPendingUpdate, startTransitionUpdate] = useTransition();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const whichButtonClick = useRef<"edit" | "add">("add");

  const { comment_id, content } = useSelector(
    (state: RootState) => state.editCommentSlice
  );

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = content;
    }
  }, [content]);

  const dispatch = useDispatch();

  const route = useRouter();

  const onFormSubmit = (formData: FormData) => {
    if (whichButtonClick.current === "add") {
      startTransitionEdit(async () => {
        try {
          const { data } = await api.post<IResponse<{ comment_id: number }>>(
            `/api/v1/website/blogs/comment/${blog_id}`,
            {
              content: formData.get("comment"),
            }
          );
          toast.success(data.message);
          route.push(`?comment_id=${data.data.comment_id}`, { scroll: false });
          if (textareaRef.current) {
            textareaRef.current.value = "";
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong while adding your comment");
        }
      });

      return;
    }

    if (whichButtonClick.current === "edit" && comment_id !== 0) {
      startTransitionUpdate(async () => {
        try {
          const { data } = await api.put<IResponse<{ comment_id: number }>>(
            `/api/v1/website/blogs/comment/${comment_id}`,
            {
              content: formData.get("comment"),
            }
          );
          toast.success(data.message);
          route.push(`?comment_id=${data.data.comment_id}`, { scroll: false });
          if (textareaRef.current) {
            textareaRef.current.value = "";
          }
          dispatch(
            setEditCommentState({
              comment_id: 0,
              content: "",
            })
          );
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong while updating your comment");
        }
      });
    }
  };

  return (
    <form
      key={comment_id}
      onSubmit={(e) => {
        e.preventDefault();
        onFormSubmit(new FormData(e.currentTarget));
      }}
    >
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label htmlFor="comment" className="sr-only">
          Your comment
        </label>
        <textarea
          name="comment"
          ref={textareaRef}
          rows={6}
          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
          placeholder="Write a comment..."
          required
          // defaultValue={content}
        ></textarea>
      </div>
      <div className="flex items-center gap-6">
        <Button
          onClick={() => (whichButtonClick.current = "add")}
          loading={isPendingEdit}
          theme="accent"
          type="submit"
        >
          Post comment
        </Button>
        {comment_id === 0 ? null : (
          <Button
            onClick={() => (whichButtonClick.current = "edit")}
            loading={isPendingUpdate}
            theme="gray"
            type="submit"
          >
            Update comment
          </Button>
        )}
      </div>
    </form>
  );
}
