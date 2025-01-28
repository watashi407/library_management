"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import BookCover from "./BookCover";
import { GetBook, users } from "@/database/schema";
import { getUserId } from "@/hooks/user_session";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import BorrowBook from "./BorrowBook";

interface Props extends GetBook {
  userId?: string;
}

async function BookOverview({
  id,
  title,
  author,
  genre,
  rating,
  coverUrl,
  coverColor,
  description,
  totalCopies,
  availableCopies,
  userId,
}: Props) {
  console.log(userId);
  if (!userId) return null;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) return null;

  const borrowingEligibility = {
    isEligible: (availableCopies ?? 0) > 0 && user.status === "APPROVED",
    message:
      (availableCopies ?? 0) < 0
        ? "Book is not available"
        : "Your are not eligible to borrow this book",
  };

  // const userIdFromSession = await getUserId(userId as string);
  // const [user] = userId
  //   ? await db.select().from(users).where(eq(users.id, userId)).limit(1)
  //   : [null];

  // console.log(user);

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5" key={id}>
        <h1>{title}</h1>
        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={32} height={22} />
            <p>{rating}</p>
          </div>
        </div>

        <div className="book-copies">
          <p>
            Total Books: <span>{totalCopies}</span>
          </p>
          <p>
            Available Books: <span>{availableCopies}</span>
          </p>
        </div>

        <p className="book-description">{description}</p>
        <BorrowBook
          bookId={id as string}
          userId={userId as string}
          borrowingEligibility={borrowingEligibility}
        />
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />
        </div>

        <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />
        </div>
      </div>
    </section>
  );
}

export default BookOverview;
