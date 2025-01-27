"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import BookCover from "./BookCover";
import { GetBook } from "@/database/schema";
import { getUserId } from "@/hooks/user_session";

interface Props {
  bookDetails: GetBook;
  userId?: string;
}

async function BookOverview({
  bookDetails: {
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
    videoUrl,
    summary,
    borrowStatus = "RETURNED",
    createdAt,
  },
  userId,
}: Props) {
  const userIdFromSession = await getUserId(userId as string);

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
        <Button className="book-overview_btn">
          <Image src="/icons/book.svg" alt="book" width={20} height={20} />
          <p className="font-bebas-neue text-xl text-dark-100">Borrow</p>
        </Button>
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
