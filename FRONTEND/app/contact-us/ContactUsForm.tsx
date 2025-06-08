"use client";
import Button from "@/components/Button";
import Input from "@/components/Form/Input";
import TextArea from "@/components/Form/TextArea";
import api from "@/lib/axios";
import { IResponse } from "@/types";
import { AxiosError } from "axios";
import { Mail, Phone, User } from "lucide-react";
import React, { useTransition } from "react";
import { toast } from "react-toastify";

export default function ContactUsForm() {
  const [isPending, startTransition] = useTransition();
  const handleFormSubmit = (formData: FormData) => {
    startTransition(async () => {
      const dataToStore: any = {};
      formData.forEach((value, key) => {
        dataToStore[key] = value;
      });
      try {
        const response = (
          await api.post<IResponse>("/api/v1/website/enquiry", dataToStore, {
            headers: { "Content-Type": "application/json" },
          })
        ).data;
        toast.success(response.message);
      } catch (error) {
        const err = error as AxiosError<IResponse>;
        toast.error(err.response?.data.message);
      }
    });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmit(new FormData(e.currentTarget));
      }}
      className="font-primary py-8 px-10 bg-light-gray rounded-2xl space-y-4"
    >
      <h2 className="font-semibold text-xl">GET IN TOUCH</h2>
      <div className="w-full h-[1px] bg-gray-300"></div>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <Input
          required
          iconBefore={<User size={15} />}
          label="NAME"
          name="name"
          placeholder="Enter your name"
        />
        <Input
          required
          iconBefore={<Phone size={15} />}
          name="contact_number"
          label="PHONE NUMBER"
          placeholder="Enter your contact number"
        />
      </div>

      <Input
        required
        iconBefore={<Mail size={15} />}
        type="email"
        name="email"
        label="EMAIL"
        placeholder="Enter your email"
      />

      <TextArea name="message" label="MESSAGE" rows={5} />

      <Button loading={isPending} theme="black">
        SEND MESSAGE
      </Button>
    </form>
  );
}
