import Link from "next/link";
import React from "react";
import BookCover from "./BookCover";
import { cn, dueDateTimeCaculation, formattedDateMonthDay } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { GetBarrowBookBook, GetBook } from "@/database/schema";
import { ReceiptText } from "lucide-react";
import DateInfo from "./DateInfo";

interface Props extends GetBook {
  barrowedBooksRecord?: GetBarrowBookBook[];
}

async function BookCard({
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
  createdAt,
  barrowedBooksRecord,
}: Props) {
  const barrowedDate =
    barrowedBooksRecord?.map((record) => {
      return formattedDateMonthDay(record.borrowDate as unknown as string);
    }) ?? [];

  const timeRemaining =
    barrowedBooksRecord?.map((record) => {
      if (!record.borrowDate || !record.dueDate) return 0;
      return dueDateTimeCaculation(
        record.borrowDate as unknown as string,
        record.dueDate
      );
    }) ?? [];

  const isLoanedBook = barrowedBooksRecord?.some(
    (record) => record.bookId === id
  );

  return (
    <li
      className={cn(
        isLoanedBook &&
          `xs:w-60 flex items-center justify-center w-full bg-gradient-to-b from-slate-900 to-slate-700 rounded-lg shadow-lg p-8 `
      )}
    >
      <Link
        href={`/books/${id as string}`}
        className={cn(isLoanedBook && "w-full flex flex-col ")}
      >
        <span className="item-cener">
          <BookCover coverColor={coverColor} coverImage={coverUrl} />
        </span>
        <div className={cn("mt-3 ", !isLoanedBook && "xs:max-w-40 max-w-28 ")}>
          <p className="book-title line-clamp-1 ">{title}</p>
          <p className="book-genre line-clamp-1">{genre}</p>
        </div>

        {isLoanedBook && (
          <div className="mt-3 w-full grid grid-cols-[1fr_auto] gap-2 items-center">
            <div className="space-y-3">
              <DateInfo
                icon="/icons/calendar.svg"
                label="Borrowed"
                value={timeRemaining as unknown as string}
              />
              <DateInfo
                icon="/icons/clock.svg"
                label="Due in"
                value={timeRemaining as unknown as string}
              />
            </div>
            <Button
              className="!bg-transparent self-end justify-self-end"
              aria-label="View receipt"
            >
              <ReceiptText color="#df5d5d" strokeWidth={1.75} />
            </Button>
          </div>
        )}
      </Link>
    </li>
  );
}

export default BookCard;
