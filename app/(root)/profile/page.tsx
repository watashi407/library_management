import React from "react";
import { sampleBooks } from "@/constant";
import BookList from "@/components/BookList";

function ProfilePage() {
  return (
    <section className="p-2">
      <BookList
        title="Borrowed Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </section>
  );
}

export default ProfilePage;
