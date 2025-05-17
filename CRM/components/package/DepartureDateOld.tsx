"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Plus, Trash } from "lucide-react";

interface IProps {
  onNext: () => void;
  onPrevious: () => void;
}

const formSchema = z.object({
  departure_date: z.array(
    z.object({
      from_date: z.string().min(1, "From date is required"),
      to_date: z.string().min(1, "To date is required"),
      avilable_seats: z
        .number({ invalid_type_error: "Must be a number" })
        .min(1, "Minimum 1 seat"),
      avilable_text: z.string().optional(),
      for_month: z.string().min(1, "Please select a month"),
    })
  ),
});

type FormType = z.infer<typeof formSchema>;

export default function DepartureDate({ onNext, onPrevious }: IProps) {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departure_date: [
        {
          from_date: "",
          to_date: "",
          avilable_seats: 1,
          avilable_text: "",
          for_month: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "departure_date",
    control: form.control,
  });

  const onSubmit = (values: FormType) => {
    console.log(values);
    onNext(); // move to next step
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button
          type="button"
          onClick={() =>
            append({
              avilable_seats: 1,
              for_month: "",
              from_date: "",
              to_date: "",
              avilable_text: "",
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <ul className="space-y-6">
            {fields.map((item, index) => (
              <li key={item.id} className="flex items-center gap-5 *:flex-1">
                <div className="flex items-start pt-6 flex-grow-0">
                  <Trash
                    onClick={() => remove(index)}
                    size={16}
                    className="cursor-pointer text-red-500"
                  />
                </div>

                {/* Month */}
                <FormField
                  key={`month-${item.id}`}
                  control={form.control}
                  name={`departure_date.${index}.for_month`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>For The Month</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose Month Name" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                          ].map((month) => (
                            <SelectItem key={month} value={month}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* From Date */}
                <FormField
                  key={`from_date-${item.id}`}
                  control={form.control}
                  name={`departure_date.${index}.from_date`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From Date *</FormLabel>
                      <Input type="date" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* To Date */}
                <FormField
                  key={`to_date-${item.id}`}
                  control={form.control}
                  name={`departure_date.${index}.to_date`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To Date *</FormLabel>
                      <Input type="date" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Available Seats */}
                <FormField
                  key={`avilable_seats-${item.id}`}
                  control={form.control}
                  name={`departure_date.${index}.avilable_seats`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available Seats *</FormLabel>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? "" : Number(val));
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Custom Availability Text */}
                <FormField
                  key={`avilable_text-${item.id}`}
                  control={form.control}
                  name={`departure_date.${index}.avilable_text`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custom Text</FormLabel>
                      <Input {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between">
            <Button type="button" onClick={onPrevious} variant="secondary">
              Previous
            </Button>
            <Button type="submit">Save & Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
