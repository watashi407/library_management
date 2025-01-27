import { books } from "@/database/schema";
import React from "react";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { redirect } from "next/navigation";
import BookOverview from "@/components/BookOverview";
import { checkUserSession } from "@/hooks/user_session";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const session = await checkUserSession();
  // for this we going make this custom becase in some implement it be occured
  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  if (!bookDetails) redirect("/404");

  return (
    <>
      <BookOverview
        bookDetails={bookDetails}
        userId={session?.user?.id as string}
      />
    </>
  );
};

export default page;
