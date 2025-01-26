import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { checkUserSession } from "@/hooks/user_session";
import { getBook } from "@/hooks/useBook";

export default async function Home() {
  const session = await checkUserSession();

  const latestBooks = await getBook();

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
