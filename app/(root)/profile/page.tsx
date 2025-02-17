import React from "react";

import BookList from "@/components/BookList";

import { checkUserSession, getUserId } from "@/hooks/userSession";
import { getBarrowBooks } from "@/hooks/useBarrowBook";
import UserProfile from "@/components/UserProfile";

async function ProfilePage() {
  const session = await checkUserSession();
  const userId = session?.user?.id;

  const [barrowRecords, userProfile] = await Promise.all([
    userId ? getBarrowBooks(userId) : [],
    userId ? getUserId(userId) : null,
  ]);

  const barrowedBooks = barrowRecords
    ? barrowRecords.map((record) => record.book)
    : [];

  const barrowedBooksRecord = barrowRecords
    ? barrowRecords.map((record) => ({
        ...record.borrowRecord,
        borrowDate: new Date(record.borrowRecord.borrowDate),
      }))
    : [];

  return (
    <section className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-[minmax(600px,1fr)_2fr] gap-8 xl:gap-12">
      {userProfile && (
        <div className="break-words min-w-0">
          <UserProfile user={userProfile} />
        </div>
      )}

      <div className="min-w-0">
        <BookList
          title="Borrowed Books"
          books={barrowedBooks}
          barrowedBooksRecord={barrowedBooksRecord}
          containerClassName="max-w-4xl mx-auto p-6  min-h-screen"
        />
      </div>
    </section>
  );
}

export default ProfilePage;
