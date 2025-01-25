"use client";
import React, { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
  FieldValues,
  Path,
} from "react-hook-form";
import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constant";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import FileUpload from "./FileUpload";

//define the types of props accept to the form function
// we also passing a T that will extend the FieldValues coming from zod
interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

//define to the props the types  dafuq
const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();
  const isSignIn = type === "SIGN_IN";
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    startTransition(async () => {
      const result = await onSubmit(data);

      if (result.success) {
        toast({
          title: "Success",
          description: `${isSignIn ? "You have successfully signed in" : "You have successfully signed up"}`,
        });

        router.push("/");
      } else {
        toast({
          title: `Error ${isSignIn ? "signing in" : "signing up"}`,
          description:
            result.error ??
            `An error occurred while ${isSignIn ? "signing in" : "signing up"}`,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn
          ? "Welcome back, knowledge seeker !"
          : "Create your library account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <FileUpload
                        type="image"
                        accept="image/*"
                        placeholder="Upload Your ID"
                        folder="ids"
                        variant="dark"
                        onFileChange={field.onChange}
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            disabled={isPending}
            type="submit"
            className="form-btn cursor-pointer"
          >
            {isPending ? (
              <>Loading ..</>
            ) : (
              <>{isSignIn ? "Sign In" : "Sign Up"}</>
            )}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? "New to Libro Watashi?" : "Already have an account?"}{" "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary cursor-pointer"
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
