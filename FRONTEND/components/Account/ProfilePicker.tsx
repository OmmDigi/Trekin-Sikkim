"use client";

import { Pencil } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { uploadFiles } from "../Utils/uploadFiles";
import SpinnerSvg from "../SpinnerSvg";
import api from "@/lib/axios";
import { toast } from "react-toastify";

interface IImageStatus {
  isUploading: boolean;
  imageUrl: string | null;
}

interface IProps {
  defaultImage: string | null;
}

export default function ProfilePicker({ defaultImage }: IProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageStatus, setImageStatus] = useState<IImageStatus>({
    isUploading: false,
    imageUrl: defaultImage,
  });
  const handlePickImage = () => {
    inputRef.current?.click();
  };

  const onImagePicked = async (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.currentTarget.files?.[0];
    if (!image) return;

    if (!confirm("Are you sure you want to update the profile image")) return;

    setImageStatus({
      isUploading: true,
      imageUrl: null,
    });

    uploadFiles({
      files: [image],
      folder: "profile",
      onError(error) {
        toast.error(error.response?.data.message);
        setImageStatus({
          isUploading: false,
          imageUrl: null,
        });
      },
      onUploaded: async (result) => {
        await api.put(`/api/v1/users/account`, {
          profile_image: result[0].url,
        });
        setImageStatus({
          isUploading: false,
          imageUrl: result[0].url,
        });
      },
    });
  };

  return (
    <button
      onClick={handlePickImage}
      className="size-32 cursor-pointer card-shdow bg-white border border-green-400 rounded-xl overflow-hidden relative max-sm:size-24"
    >
      <input
        onChange={onImagePicked}
        className="hidden"
        type="file"
        ref={inputRef}
      />
      {imageStatus.imageUrl ? (
        <Image
          src={imageStatus.imageUrl}
          alt="Profile Image"
          height={80}
          width={80}
          quality={100}
          className="size-full object-cover"
        />
      ) : null}

      <div className="absolute inset-0 size-full flex items-center justify-center z-20">
        {imageStatus.isUploading ? (
          <SpinnerSvg size="28px" />
        ) : (
          <div className="p-2 bg-white shadow-lg rounded-full">
            <Pencil size={15} />
          </div>
        )}
      </div>
    </button>
  );
}
