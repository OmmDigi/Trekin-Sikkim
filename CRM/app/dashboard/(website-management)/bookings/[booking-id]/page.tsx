"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Please Enter Person Name" }),
  contact_number: z.string().min(1, { message: "Please Enter Contact Number" }),
  email: z
    .string()
    .email({ message: "Please Enter A Valid Email Id" })
    .min(1, { message: "Please Enter Email" }),

  num_of_persons: z.number().min(1),
  arrival_date: z.string().min(1, { message: "Arriva Date Is Required" }),
  departure_date: z.string().min(1, { message: "Departure  Date Is Required" }),
  address: z.string().min(1, { message: "Address Is Required" }),

  trip_type: z.string().min(1, { message: "Trip Type Is Required" }),
  group_type: z.string().min(1, { message: "Group Type Is Required" }),

  total_paid: z.number().min(1, { message: "Total Paid Must Be More Than 0" }),
  panding_amount: z.number().min(0, { message: "Panding Amount Is Required" }),

  additional: z.array(
    z.object({
      additional_id: z.number(),
      additional_name: z.string(),
      additional_price: z.number(),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

export default function SingleBooking() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contact_number: "",
      email: "",
      num_of_persons: 0,
      address: "",
      arrival_date: "",
      departure_date: "",
      trip_type: "Trek",
      group_type: "Open Group",
      total_paid: 0,
      panding_amount: 0,
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className="size-full space-y-2.5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="font-semibold text-xl pb-3">Basic Info</h1>
          <Separator className="mb-5" />

          <div className="flex flex-wrap *:grow *:basis-96 gap-3.5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Person Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter person name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter contact number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter email id" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="num_of_persons"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number Of Persons Will Come</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Number of persons will come"
                      onChange={(e) => {
                        const value = e.currentTarget.value;
                        const parsedValue = parseInt(value);
                        field.onChange(
                          isNaN(parsedValue) ? undefined : parsedValue
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="arrival_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arrival Date</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Arrival Date" type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departure_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure Date</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Departure Date"
                      type="date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-wrap *:grow *:basis-96 gap-3.5 pt-3.5">
            <FormField
              control={form.control}
              name="trip_type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Trip Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue defaultValue="Trek" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="Trek">Trek</SelectItem>
                      <SelectItem value="Tour">Tour</SelectItem>
                      <SelectItem value="Expedition">Expedition</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="group_type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue defaultValue="Private Group" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="Private Group">
                        Private Group
                      </SelectItem>
                      <SelectItem value="Open Group">Open Group</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-3.5">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Person Address</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h1 className="font-semibold text-xl pb-3 pt-7">Payment Info</h1>
          <Separator className="mb-5" />

          <div className="flex flex-wrap *:grow *:basis-96 gap-3.5">
            <FormField
              control={form.control}
              name="total_paid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Paid</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Total Paid Amount"
                      onChange={(e) => {
                        const value = e.currentTarget.value;
                        const parsedValue = parseInt(value);
                        field.onChange(
                          isNaN(parsedValue) ? undefined : parsedValue
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="panding_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pending Amount</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Pending Amount"
                      onChange={(e) => {
                        const value = e.currentTarget.value;
                        const parsedValue = parseInt(value);
                        field.onChange(
                          isNaN(parsedValue) ? undefined : parsedValue
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-2.5 pt-7">
            <Button type="button" variant="secondary">
              Back
            </Button>
            <Button>Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
