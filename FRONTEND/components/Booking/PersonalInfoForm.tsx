"use client";

import { useForm, Controller } from "react-hook-form";
import Button from "../Button";
import Dropdown from "../Form/Dropdown";
import PhoneInput from "../Form/PhoneInput";
import Input from "../Input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setPersonalInfo } from "@/redux/slices/booking.form.slice";
import { RootState } from "@/redux/store";
import { IBooking } from "@/types";
import { COUNTRIES, GROUP_TYPES } from "@/constant";

const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Your full name is required" }),
  email: z
    .string()
    .email()
    .min(1, { message: "Your email address is required" }),
  phone: z.string().min(1, { message: "Your contact number is required" }),
  group_type: z.string().min(1, { message: "Choose a group type first" }),
  address: z.string().optional(),
  number_of_people: z.number().min(1),
  dial_code: z.string().min(1),
});

type TContactForm = z.infer<typeof contactFormSchema>;

interface IProps {
  serverBookingInfo: IBooking | null;
}

export default function ContactInfoForm({ serverBookingInfo }: IProps) {
  const {
    getValues,
    control,
    formState: { errors },
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<TContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      address: "",
      group_type: "",
      number_of_people: 1,
      email: "",
      name: "",
      phone: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const reduxBookingInfo = useSelector((state: RootState) => state.booking);
  const searchParams = useSearchParams();

  const route = useRouter();

  const onSubmit = (formData: TContactForm) => {
    // do api management here
    dispatch(
      setPersonalInfo({
        full_name: formData.name,
        contact_number: formData.phone,
        email: formData.email,
        number_of_people: formData.number_of_people,
        address: formData.address,
        group_type: formData.group_type,
        dial_code: formData.dial_code,
      })
    );
    const newSearchParams = new URLSearchParams(searchParams);
    if (formData.number_of_people > 1) {
      newSearchParams.set("step", "participants-info");
    } else {
      newSearchParams.set("step", "payment");
    }
    startTransition(() => {
      route.push("/booking?" + newSearchParams.toString());
    });
  };

  useEffect(() => {
    if (reduxBookingInfo.personal_info.full_name !== "") {
      reset({
        address: reduxBookingInfo.personal_info.address,
        group_type: reduxBookingInfo.personal_info.group_type,
        number_of_people: reduxBookingInfo.personal_info.number_of_people,
        email: reduxBookingInfo.personal_info.email,
        name: reduxBookingInfo.personal_info.full_name,
        phone: reduxBookingInfo.personal_info.contact_number,
        dial_code:
          reduxBookingInfo?.personal_info?.dial_code || COUNTRIES[0].dial_code,
      });
    } else {
      reset({
        address: serverBookingInfo?.userInfo.address || "",
        group_type: "",
        number_of_people: 1,
        email: serverBookingInfo?.userInfo.user_email || "",
        name: serverBookingInfo?.userInfo.user_name || "",
        phone: serverBookingInfo?.userInfo.user_contact_number,
        dial_code:
          serverBookingInfo?.userInfo.dial_code || COUNTRIES[0].dial_code,
      });
    }
  }, [reduxBookingInfo, serverBookingInfo]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-1.5 pr-10 max-sm:pr-0"
    >
      <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
        <Input
          {...register("name")}
          label="Full name *"
          placeholder="Enter your full name here"
          errorMsg={errors.name?.message}
        />
        <Input
          {...register("email")}
          label="Email address *"
          placeholder="Enter your email address here"
          errorMsg={errors.email?.message}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <PhoneInput
              label="Contact Number *"
              placeholder="Enter your contact number here"
              onChange={(phoneNumber, dialCode) => {
                field.onChange(phoneNumber);
                setValue("dial_code", dialCode);
              }}
              errorMsg={errors.phone?.message}
              defaultValue={getValues("phone")}
              dialCode={getValues("dial_code")}
            />
          )}
        />

        <Controller
          control={control}
          name="group_type"
          render={({ field }) => (
            <Dropdown
              label="Choose Group Type *"
              options={GROUP_TYPES}
              onSelect={(value) => field.onChange(value)}
              placeholder="Select group type"
              classNames="w-full mb-4"
              defaultValue={field.value}
              errorMsg={errors.group_type?.message}
            />
          )}
        />

        <Input
          {...register("number_of_people", { valueAsNumber: true })}
          label="Number Of People *"
          placeholder="Enter how much people will come"
          errorMsg={errors.number_of_people?.message}
        />

        <Input
          {...register("address")}
          label="Your Address"
          placeholder="Enter your full address here"
          errorMsg={errors.address?.message}
        />
      </div>

      <Button loading={isPending} type="submit" theme="accent" className="mt-5">
        Save & Continue
      </Button>

      {errors.root?.message ? (
        <span className="text-sm text-red-500">{errors.root?.message}</span>
      ) : null}
    </form>
  );
}
