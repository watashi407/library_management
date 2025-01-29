import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";

import { desc, eq, inArray } from "drizzle-orm";

export async function getBarrowBooks(id: string) {
  const query = db
    .select({
      borrowRecord: {
        id: borrowRecords.id,
        borrowDate: borrowRecords.borrowDate,
        dueDate: borrowRecords.dueDate,
        returnDate: borrowRecords.returnDate,
        status: borrowRecords.status,
        bookId: borrowRecords.bookId,
        userId: borrowRecords.userId,
        createdAt: borrowRecords.createdAt,
      },
      book: {
        id: books.id,
        title: books.title,
        author: books.author,
        genre: books.genre,
        coverUrl: books.coverUrl,
        coverColor: books.coverColor,
        description: books.description,
        totalCopies: books.totalCopies,
        availableCopies: books.availableCopies,
        videoUrl: books.videoUrl,
        summary: books.summary,
        createdAt: books.createdAt,
        rating: books.rating,
      },
    })
    .from(borrowRecords)
    .innerJoin(books, eq(books.id, borrowRecords.bookId))
    .where(eq(borrowRecords.userId, id));

  return query;
}
