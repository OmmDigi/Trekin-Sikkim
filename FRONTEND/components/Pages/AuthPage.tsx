"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { TransitionLink } from "@/components/Utils/TransitionLink";
import api from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { GrLinkNext } from "react-icons/gr";
import { z } from "zod";
import { IResponse } from "../../types";
import { useTransition } from "react";
import CustomLink from "../CustomLink";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

interface IProps {
  type: "login" | "signup";
}

const authFormSchema = z.object({
  user_name: z
    .string()
    .min(1, { message: "Please enter your full name" })
    .optional(),
  user_email: z.string().email(),
  user_password: z
    .string()
    .min(5, { message: "Password lenght must be 5 characters" }),
});

type AuthFormType = z.infer<typeof authFormSchema>;

export default function AuthPage({ type }: IProps) {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const [isLoading, startTransition] = useTransition();
  const routes = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    resolver: zodResolver(authFormSchema),
  });

  const onSubmit = (values: AuthFormType) => {
    const apiEndpoint =
      type === "login" ? "/api/v1/users/login" : "/api/v1/users/signup";
    startTransition(async () => {
      try {
        const { data } = await api.post<IResponse<string>>(apiEndpoint, values);
        toast.success(data.message);
        startTransition(() => {
          if (data.statusCode === 200) {
            if (type === "login") {
              if (redirectUrl !== null) {
                routes.push(redirectUrl);
              } else {
                routes.push("/account");
              }
            } else {
              if (redirectUrl) {
                routes.push(`/auth/login?redirect=${redirectUrl}`);
              } else {
                routes.push("/auth/login");
              }
            }
          }
        });
      } catch (error) {
        const err = error as AxiosError<IResponse>;
        const key = err.response?.data.key || ("root" as any);
        setError(key, { message: err.response?.data.message });
      }
    });
  };

  return (
    <main className="flex h-screen overflow-hidden">
      <div className="basic-[30rem] min-w-[30rem] h-full flex items-center max-sm:basis-full max-sm:min-w-full max-sm::grow">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-6 w-full max-w-[25rem] mx-auto h-full flex flex-col justify-center max-sm:max-w-[90%]"
        >
          <h2 className="font-semibold text-2xl">
            {type === "signup" ? "Create Account" : "Login Account"}
          </h2>

          <Button
            type="button"
            className="border border-gray-400 flex items-center gap-3.5 !rounded-md font-semibold"
          >
            <FcGoogle size={20} />
            <span>{type === "signup" ? "Sign up" : "Log in"} with Google</span>
          </Button>

          <div className="flex items-center gap-4">
            <div className="grow h-[1px] bg-gray-400 opacity-30"></div>
            <span className="text-xs">OR</span>
            <div className="grow h-[1px] bg-gray-400 opacity-30"></div>
          </div>

          {type === "signup" ? (
            <Input
              {...register("user_name")}
              label="Full Name *"
              placeholder="Enter your full name"
              errorMsg={errors.user_name?.message}
            />
          ) : null}

          <Input
            {...register("user_email")}
            label="Email Address *"
            placeholder="Enter your email"
            errorMsg={errors.user_email?.message}
          />
          <Input
            {...register("user_password")}
            label="Password *"
            placeholder="Enter a password"
            errorMsg={errors.user_password?.message}
          />

          {errors.root ? (
            <span className="text-sm text-red-500">{errors.root?.message}</span>
          ) : null}

          <Button
            disabled={isLoading}
            loading={isLoading}
            className="rounded-md text-base !font-semibold"
            theme="black"
          >
            {type === "signup" ? "Create account" : "Login"}
          </Button>

          {type === "signup" ? (
            <h2 className="text-center text-sm flex item-center justify-center gap-1">
              Already have an account?{" "}
              <CustomLink
                href={`/auth/login${redirectUrl ? `?redirect=${redirectUrl}` : ""}`}
                className="font-semibold underline"
              >
                Log in
              </CustomLink>
            </h2>
          ) : (
            <h2 className="text-center text-sm flex item-center justify-center gap-1">
              Don&apos;t have any account?{" "}
              <CustomLink
                href={`/auth/signup${redirectUrl ? `?redirect=${redirectUrl}` : ""}`}
                className="font-semibold underline"
              >
                Create Account
              </CustomLink>
            </h2>
          )}
        </form>
      </div>

      <div className="grow overflow-hidden relative max-sm:hidden">
        <div className="absolute inset-0 fade-gradient-bottom p-5">
          <TransitionLink
            href={"/"}
            className="inline-flex items-center gap-2 p-2.5 px-4 rounded-full text-xs font-semibold bg-[#fff] backdrop-blur-2xl"
          >
            <span>Back To Website</span>
            <GrLinkNext />
          </TransitionLink>
        </div>
        <Image
          className="size-full object-cover"
          src={"/videos/hiking.webp"}
          alt="Hiking Webp"
          height={1200}
          width={1200}
        />
      </div>
    </main>
  );
}
