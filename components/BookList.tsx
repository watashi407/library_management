import React from "react";
import BookCard from "./BookCard";
import { GetBarrowBookBook, GetBook } from "@/database/schema";

interface Props {
  title: string;
  books: GetBook[];
  barrowedBooksRecord?: GetBarrowBookBook[];
  containerClassName?: string;
}

function BookList({
  title,
  books,
  barrowedBooksRecord,
  containerClassName,
}: Props) {
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
      <ul className="book-list">
        {books.map((book) => {
          const bookBorrowRecords = barrowedBooksRecord?.filter(
            (record) => record.bookId === book.id
          );

          return (
            <BookCard
              key={book.id}
              {...book}
              barrowedBooksRecord={bookBorrowRecords}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default BookList;
