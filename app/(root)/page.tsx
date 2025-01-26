import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constant";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { Book } from "@/types";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { desc } from "drizzle-orm";

export default async function Home({ session }: { session: Session }) {
  if (!session) return redirect("/sign-in");

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <BookOverview {...latestBooks[0]} />
      <BookList
        title="Latest Books"
        books={latestBooks}
        containerClassName="mt-28"
      />
    </>
  );
}
