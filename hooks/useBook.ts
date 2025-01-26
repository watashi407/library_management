import { db } from "@/database/drizzle";
import { books, GetBook } from "@/database/schema";
import React from "react";
import { desc } from "drizzle-orm";

export async function getBook() {
  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as GetBook[];

  return latestBooks;
}
