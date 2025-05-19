"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Editor } from "../Editor";
import { ButtonLoading } from "../ui/button-loading";
import { useDoMutation } from "@/hooks/useDoMutation";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import MediaGallery from "../MediaGallery";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const blogSchema = z.object({
  heading: z.string().min(1),
  blog_content: z.string().min(1),
  thumbnail: z.string(),

  media_id: z.number().min(1, { message: "Choose The Thumbnail Of Your Blog" }),

  meta_title: z.string().min(1),
  meta_description: z.string().min(1),
  meta_keywords: z.string().min(1),
  meta_canonical_url: z.string().optional(),

  thumbnail_alt_tag: z.string(),

  visible: z.boolean(),
});

type TBlogForm = z.infer<typeof blogSchema>;

interface IProps {
  blog_id: number;
  currentStep: number;
}

export default function BlogBasicInfo({ blog_id, currentStep }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<TBlogForm>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      thumbnail: "demo",
      thumbnail_alt_tag: "demo",
      visible: false,
      media_id: 0,
    },
  });

  const { isLoading, mutate } = useDoMutation();
  const onSubmit = (values: TBlogForm) => {
    mutate({
      apiPath: "/api/v1/website/blogs",
      method: "post",
      formData: values,
    });
  };

  const { selectedMedia } = useSelector(
    (state: RootState) => state.choosedMediaItems
  );

  const onSaveBtnClick = () => {
    form.setValue("media_id", selectedMedia[0].media_id);
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="min-w-[80rem] max-h-[99vh]">
          <DialogHeader>
            <DialogTitle>Choose Media</DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[70vh] px-10">
            <MediaGallery asChooser={true} />
          </ScrollArea>

          <DialogFooter>
            <ButtonLoading loading={isLoading} onClick={onSaveBtnClick}>
              Save
            </ButtonLoading>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="heading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose Blog Heading</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter blog heading"
                      onChange={(e) => field.onChange(e.currentTarget.value)}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="media_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose Blog Thumbnail</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-500 text-sm">
                        Add Blog Thumbnail
                      </Label>

                      <Button onClick={() => setIsOpen(true)} type="button">
                        <Edit />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
            control={form.control}
            name="thumbnail_alt_tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail Alt Tag</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter blog thumbnail alt tag"
                    onChange={(e) => field.onChange(e.currentTarget.value)}
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
            {/* <FormField
            control={form.control}
            name="visible"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visible</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Boolean(value))}
                  defaultValue={String(field.value)}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Blog Visibility" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"true"}>True</SelectItem>
                    <SelectItem value={"false"}>False</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          </div>

          <FormField
            control={form.control}
            name="blog_content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Content</FormLabel>
                <FormControl>
                  <Editor
                    onBlur={(code) => {
                      field.onChange(code);
                    }}
                    storageFolderName="blogs"
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="meta_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Meta Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter blog meta title"
                      onChange={(e) => field.onChange(e.currentTarget.value)}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meta_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Meta Descripton</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter blog meta description"
                      onChange={(e) => field.onChange(e.currentTarget.value)}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meta_keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Meta Keywords</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter blog meta keywords"
                      onChange={(e) => field.onChange(e.currentTarget.value)}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meta_canonical_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Meta Canonical Url</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter blog meta canonical url"
                      onChange={(e) => field.onChange(e.currentTarget.value)}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <ButtonLoading loading={isLoading}>Save & Next</ButtonLoading>
        </form>
      </Form>
    </>
  );
}
