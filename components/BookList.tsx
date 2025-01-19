import { Book, BookSample } from "@/types";
import React from "react";
import BookCard from "./BookCard";

interface Props {
  title: string;
  books: BookSample[];
  containerClassName?: string;
}

function BookList({ title, books, containerClassName }: Props) {
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  );
}

export default BookList;
