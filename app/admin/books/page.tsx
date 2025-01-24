import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="w-full bg-white rounded-2xl p-7">
      <div className="flex flex-wrap item-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href={`/admin/books/new`}>+ Create New Book</Link>
        </Button>
      </div>
    </section>
  );
};

export default page;
