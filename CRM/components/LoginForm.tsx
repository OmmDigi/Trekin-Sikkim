"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { LoginResponse, TLoginForm } from "@/features/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/features/auth/validator/authValidator";
import Link from "next/link";
import { ButtonLoading } from "./ui/button-loading";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IResponse } from "@/types";
import { toast } from "react-toastify";
import { login } from "@/features/auth/api/auth";
import CustomLink from "./CustomLink";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      user_email: "",
      user_password: "",
    },
  });

  const route = useRouter();
  const [isPending, startTransition] = useTransition();

  // mutation for Login
  const { mutate, isLoading } = useMutation<
    LoginResponse,
    AxiosError<IResponse>,
    TLoginForm
  >({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(data.message);
      startTransition(() => {
        route.push("/dashboard")
      })
    },
    onError: (error) => {
      const key = error.response?.data.key;
      const message = error.response?.data.message;
      if (!key) return form.setError("root", { message });
      form.setError(key as any, { message });
    },
  });

  const onSubmit = ({ user_email, user_password }: TLoginForm) => {
    mutate({ user_email, user_password });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="user_email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            // id="email"
                            // type="email"
                            placeholder="m@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="user_password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <FormLabel>Password</FormLabel>
                          <CustomLink
                            href="/auth/forgot-password"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </CustomLink>
                        </div>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <div className="space-y-1">
                  <ButtonLoading
                    loading={isLoading || isPending}
                    type="submit"
                    className="w-full"
                  >
                    Login
                  </ButtonLoading>

                  <FormRootError className="text-center" />
                </div>

                <Label className="justify-center">
                  Contact Us For Your Login Cradintial
                </Label>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
