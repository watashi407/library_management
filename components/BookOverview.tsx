"use client";

import { Book, BookSample } from "@/types";
import Image from "next/image";
import React from "react";

function BookOverview({
  id,
  title,
  author,
  genre,
  rating,
  total_copies,
  available_copies,
  description,
  color,
  cover,
  video,
  summary,
}: BookSample) {
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
            Total Books: <span>{total_copies}</span>
          </p>
          <p>
            Available Books: <span>{available_copies}</span>
          </p>
        </div>

        <p className="book-description">{description}</p>
      </div>
    </section>
  );
}

export default BookOverview;
