import { CalendarFold, MoveRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { formatDateToReadable } from "../Utils/formatDateToReadable";
import CustomLink from "../CustomLink";
import { IBlogList } from "@/types";

interface IProps {
  blog: IBlogList;
}

export default function BlogListItem({ blog }: IProps) {

  return (
    // <li className="space-y-2 card-shdow rounded-2xl overflow-hidden">
    //   <div className="overflow-hidden aspect-video rounded-b-2xl relative">
    //     <Image
    //       className="size-full object-cover"
    //       src={blog.thumbnail}
    //       alt="Treking"
    //       height={1200}
    //       width={1200}
    //     />
    //   </div>

    //   <div className="space-y-2 p-4">
    //     <h2 className="font-semibold line-clamp-2">{blog.heading}</h2>
    //     <h3 className="text-sm text-gray-600 line-clamp-2">
    //       {blog?.sub_heading}
    //     </h3>

    //     <div className="flex items-center justify-between">
    //       <h4 className="text-xs text-gray-500 flex items-center gap-2 flex-1">
    //         <span>
    //           <CalendarFold size={14} />
    //         </span>
    //         <span>{formatDateToReadable(blog.created_at)}</span>
    //       </h4>

    //       <CustomLink
    //         aria-label={`Read the article titled "${blog.heading}"`}
    //         title={`Read: ${blog.heading}`}
    //         href={"/article/" + blog.slug}
    //         className="flex items-center gap-2 justify-end bg-gradient-to-r text-xs bg-accent text-white font-semibold py-2 px-4 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
    //       >
    //         <span>
    //           Read More
    //           <span className="sr-only"> about {blog.heading}</span>
    //         </span>
    //         <MoveRight size={15} />
    //       </CustomLink>
    //     </div>
    //   </div>
    // </li>
    <li className="space-y-2 card-shdow rounded-2xl overflow-hidden">
      <div className="overflow-hidden aspect-video rounded-b-2xl relative">
        <Image
          className="size-full object-cover"
          src={blog.thumbnail || "/placeholder_background.jpg"}
          alt="Treking"
          height={1200}
          width={1200}
        />
      </div>

      <div className="space-y-2 p-4">
        <h2 className="font-semibold line-clamp-1">{blog.title}</h2>
        <span
          dangerouslySetInnerHTML={{ __html: blog.short_description }}
          className="text-sm text-gray-600 line-clamp-2"
        ></span>

        <div className="flex items-center justify-between">
          <h4 className="text-xs text-gray-500 flex items-center gap-2 flex-1">
            <span>
              <CalendarFold size={14} />
            </span>
            <span>{formatDateToReadable(blog.date)}</span>
          </h4>

          <CustomLink
            aria-label={`Read the article titled "${blog.title}"`}
            title={`Read: ${blog.title}`}
            href={"/article/" + blog.slug}
            className="flex items-center gap-2 justify-end bg-gradient-to-r text-xs bg-accent text-white font-semibold py-2 px-4 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
          >
            <span>
              Read More
              <span className="sr-only"> about {blog.title}</span>
            </span>
            <MoveRight size={15} />
          </CustomLink>
        </div>
      </div>
    </li>
  );
}
