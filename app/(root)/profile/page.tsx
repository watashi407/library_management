import React from "react";

import BookList from "@/components/BookList";

import { checkUserSession, getUserId } from "@/hooks/userSession";
import { getBarrowBooks } from "@/hooks/useBarrowBook";

async function ProfilePage() {
  const session = await checkUserSession();

  const barrowRecords =
    session?.user?.id && (await getBarrowBooks(session.user.id));

  const userProfile = session?.user?.id && (await getUserId(session.user.id));

  console.log(userProfile);

  return (
    <section className="p-2">
      {/* profile */}

      <BookList
        title="Borrowed Books"
        books={barrowRecords || []}
        containerClassName="mt-28"
      />
    </section>
  );
}

export default ProfilePage;
