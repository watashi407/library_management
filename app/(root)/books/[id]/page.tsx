import { books } from "@/database/schema";
import React from "react";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { redirect } from "next/navigation";
import BookOverview from "@/components/BookOverview";
import { checkUserSession } from "@/hooks/user_session";
import BookVideo from "@/components/BookVideo";

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
      <div className="book-details">
        <div className="flex[1.5]">
          <section className="flex flex-col gap-7">
            <h3>video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>
        {/** Similar Book Component */}
      </div>
    </>
  );
};

export default page;
