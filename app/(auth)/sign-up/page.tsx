"use client";
import AuthForm from "@/components/AuthForm";
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
      onSubmit={() => {}}
    />
  );
}

export default signUp;
