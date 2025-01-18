"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { clickmeBay } from "@/app/_sample.action";

function ButtonSample() {
  const [state, action, isPending] = useActionState(clickmeBay, null);
  return (
    <section className="h-full max-h-screen flex justify-center items-center">
      <form action={action}>
        <Button disabled={isPending}>
          {isPending ? "loading baby ..." : "Click it baby"}
        </Button>
      </form>
      {state?.data}
    </section>
  );
}

export default ButtonSample;
