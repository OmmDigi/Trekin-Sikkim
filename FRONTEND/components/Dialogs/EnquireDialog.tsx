"use client";

import React, { useTransition } from "react";
import DialogBody from "./DialogBody";
import Input from "../Input";
import HeadingSubHeding from "../HeadingSubHeding";
import TextArea from "../Form/TextArea";
import Button from "../Button";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { setDialog } from "@/redux/slices/dialog.slice";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { IResponse } from "@/types";
import { AxiosError } from "axios";

function EnquireDialog() {
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();

  const closeDialog = () => {
    dispatch(
      setDialog({
        id: "enquiry-form",
        type: "CLOSE",
      })
    );
  };

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
        closeDialog();
      } catch (error) {
        const err = error as AxiosError<IResponse>;
        toast.error(err.response?.data.message);
      }
    });
  };

  return (
    <DialogBody
      theme="white"
      className="!rounded-md relative !shadow-2xl p-10 font-primary w-[45rem] mt-10 bg-green-100 space-y-6 max-sm:w-full max-sm:h-full max-sm:mt-0 max-sm:overflow-y-auto"
    >
      <X
        onClick={closeDialog}
        className="absolute right-6 top-6 cursor-pointer active:scale-75"
        size={20}
      />

      <HeadingSubHeding
        heading="Submit Your Enquery"
        subheading="Fillup the below details, our expert will get back to you soon!"
        wrapperCss="block"
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit(new FormData(e.currentTarget));
        }}
        className="space-y-3"
      >
        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <Input
            required
            name="name"
            label="Full Name *"
            placeholder="Enter your name *"
          />
          <Input
            required
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email id"
          />
          <Input
            required
            name="contact_number"
            label="Contact Number *"
            placeholder="Enter your contact number"
          />
          <Input
            required
            name="number_of_person"
            label="Number Of Person *"
            placeholder="Number of person will come"
          />
          {/* <Input label="Arrival Date" type="date" />
          <Input label="Departure Date" type="date" /> */}
        </div>
        {/* <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <Dropdown
            onSelect={() => {}}
            label="Choose Trip Type"
            options={[
              { label: "Tour", value: "Tour" },
              { label: "Trek", value: "Trek" },
              { label: "Expedition", value: "Expedition" },
            ]}
          />
          <Dropdown
            onSelect={() => {}}
            label="Choose A Package"
            options={[
              {
                label: "Goechala Trek-Trekking In Sikkim",
                value: "Goechala Trek-Trekking In Sikkim",
              },
              {
                label: "Sandakphu Trek Package cost",
                value: "Sandakphu Trek Package cost",
              },
              { label: "Trek to Bajre Dara", value: "Trek to Bajre Dara" },
            ]}
          />
          <Dropdown
            onSelect={() => {}}
            label="Choose Trip Type"
            options={[
              { label: "Tour", value: "Tour" },
              { label: "Trek", value: "Trek" },
              { label: "Expedition", value: "Expedition" },
            ]}
          />
        </div> */}
        <TextArea
          name="message"
          className="w-full"
          label="Message"
          rows={5}
          placeholder="Enter your enquery here. any other message you want to type"
        />

        <div className="flex items-center gap-6">
          <Button loading={isPending} className="!bg-red-500 text-white">
            Submit
          </Button>
          <Button onClick={closeDialog} type="button">
            Cancel
          </Button>
        </div>
      </form>
    </DialogBody>
  );
}

export default EnquireDialog;
