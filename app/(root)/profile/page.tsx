import React from "react";

import BookList from "@/components/BookList";
import { getBook } from "@/hooks/useBook";

async function ProfilePage() {
  const books = await getBook();

  return (
    <section className="p-2">
      <BookList
        title="Borrowed Books"
        books={books}
        containerClassName="mt-28"
      />
    </section>
  );
}

export default ProfilePage;
