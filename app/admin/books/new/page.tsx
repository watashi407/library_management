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
      <section className="flex justify-center items-center">
        <div className="w-full max-w-5xl">
          <BookForm />
        </div>
      </section>
    </>
  );
};

export default page;
