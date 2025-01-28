import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import React from "react";
import { desc, eq, inArray } from "drizzle-orm";

export async function getBarrowBooks(id: string) {
  // First get the borrowed records
  const returnBooksId = await db
    .select()
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, id))
    .limit(10);

  // Extract all bookIds
  const bookIds = returnBooksId.map((record) => record.bookId);

  // Then get all books in a single query
  const borrowedBooks = await db
    .select()
    .from(books)
    .where(inArray(books.id, bookIds));

  return borrowedBooks;
}
