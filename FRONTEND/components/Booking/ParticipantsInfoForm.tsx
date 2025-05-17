"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../Input";
import PhoneInput from "../Form/PhoneInput";
import Button from "../Button";
import { Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setParticipantInfo,
  setPersonalInfo,
} from "@/redux/slices/booking.form.slice";
import { COUNTRIES } from "@/constant";

const participantsSchema = z.object({
  participants: z.array(
    z.object({
      name: z.string().min(1, { message: "Your full name is required" }),
      email: z
        .string()
        .email()
        .min(1, { message: "Your email address is required" }),
      phone: z.string().min(1, { message: "Your contact number is required" }),
      dial_code: z.string().min(1),
    })
  ),
});

type ParticipantsForm = z.infer<typeof participantsSchema>;

export default function ParticipantsInfoForm() {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const reduxBookingInfo = useSelector((state: RootState) => state.booking);
  const route = useRouter();
  const dispatch = useDispatch();
  const {
    getValues,
    control,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<ParticipantsForm>({
    resolver: zodResolver(participantsSchema),
    defaultValues: {
      participants: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "participants",
  });

  const onSubmit = (formData: ParticipantsForm) => {
    dispatch(
      setParticipantInfo(
        formData.participants.map((item) => ({
          full_name: item.name,
          contact_number: item.phone,
          email: item.email,
          dial_code: item.dial_code,
        }))
      )
    );

    const oldPersonalInfo = { ...reduxBookingInfo.personal_info };
    oldPersonalInfo.number_of_people = formData.participants.length + 1;
    dispatch(setPersonalInfo(oldPersonalInfo));

    const newUrlSearchParams = new URLSearchParams(searchParams);
    newUrlSearchParams.set("step", "payment");
    startTransition(() => {
      route.push("/booking?" + newUrlSearchParams.toString());
    });
  };

  const addNewParticipant = () => {
    append({
      name: "",
      email: "",
      phone: "",
      dial_code: COUNTRIES[0].dial_code,
    });
  };
  const removeParticipand = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    const newArray: {
      name: string;
      email: string;
      phone: string;
      dial_code: string;
    }[] = [];
    new Array(reduxBookingInfo.personal_info.number_of_people - 1)
      .fill(1)
      .forEach((_, index) => {
        const participandInfo = reduxBookingInfo.participant_info[index];
        newArray.push({
          name: participandInfo?.full_name || "",
          email: participandInfo?.email || "",
          phone: participandInfo?.contact_number,
          dial_code: participandInfo?.dial_code || COUNTRIES[0].dial_code,
        });
      });

    setValue("participants", newArray);
  }, [reduxBookingInfo]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul className="space-y-10">
        {fields.map((item, index) => (
          <li key={item.id} className="space-y-2.5">
            <div className="flex items-center">
              <span className="font-semibold text-accent underline flex-1">
                Participant {index + 1}
              </span>

              <Trash2
                onClick={() => removeParticipand(index)}
                size={15}
                className="cursor-pointer text-red-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
              <Input
                {...register(`participants.${index}.name`)}
                label="Participant Full name *"
                placeholder="Enter Participant full name here"
                errorMsg={errors.participants?.[index]?.name?.message}
              />
              <Input
                {...register(`participants.${index}.email`)}
                label="Participant Email address *"
                placeholder="Enter Participant email address here"
                errorMsg={errors.participants?.[index]?.email?.message}
              />
            </div>
            <Controller
              control={control}
              name={`participants.${index}.phone`}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  label="Participant Contact Number *"
                  placeholder="Enter Participant contact number here"
                  onChange={(phoneNumber, dialCode) => {
                    field.onChange(phoneNumber);
                    setValue(`participants.${index}.dial_code`, dialCode);
                  }}
                  errorMsg={errors.participants?.[index]?.phone?.message}
                  defaultValue={getValues(`participants.${index}.phone`)}
                  dialCode={getValues(`participants.${index}.dial_code`)}
                />
              )}
            />
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-end py-3">
        <button
          onClick={addNewParticipant}
          type="button"
          className="font-semibold text-sm"
        >
          + Add New Participant
        </button>
      </div>
      <Button loading={isPending} type="submit" theme="accent" className="mt-5">
        Save & Continue
      </Button>
    </form>
  );
}
