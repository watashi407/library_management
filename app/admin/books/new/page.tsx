import BookForm from "@/components/admin/forms/BookForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <Button asChild>
        <Link href={`/admin/books`} className="back-btn">
          go back
        </Link>
      </Button>

      <section className="w-full max-x-2xl">
        <BookForm />
      </section>
    </>
  );
};

export default page;
