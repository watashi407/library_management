"use client";
import AuthForm from "@/components/AuthForm";
import { signUpActions } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/zod_schema/validation";
import React from "react";

function signUp() {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        fullName: "",
        universityId: 0,
        universityCard: "",
        password: "",
      }}
      onSubmit={signUpActions}
    />
  );
}

export default signUp;
