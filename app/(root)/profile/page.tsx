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

  return (
    <section className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-[minmax(300px,1fr)_2fr] gap-8 xl:gap-12">
      {userProfile && (
        <div className="break-words min-w-0">
          <UserProfile user={userProfile} />
        </div>
      )}

      <div className="min-w-0">
        <BookList
          title="Borrowed Books"
          books={barrowRecords}
          containerClassName="space-y-4"
        />
      </div>
    </section>
  );
}

export default ProfilePage;
