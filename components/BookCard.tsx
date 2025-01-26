import { BookSample } from "@/types";
import Link from "next/link";
import React from "react";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { GetBook } from "@/database/schema";

function BookCard({
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
}: GetBook) {
  return (
    <li className={cn(borrowStatus && "xs:w-52 w-full")}>
      <Link
        href={`/books/${id}`}
        className={cn(borrowStatus && "w-full flex flex-col items-center")}
      >
        <BookCover coverColor={coverColor} coverImage={coverUrl} />
        <div className={cn("mt-4", !borrowStatus && "xs:max-w-40 max-w-28")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {borrowStatus && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src={`/icons/calendar.svg`}
                alt={`calendar`}
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">11 days left to return</p>
            </div>
            <Button className="book-btn">Download receipt</Button>
          </div>
        )}
      </Link>
    </li>
  );
}

export default BookCard;
