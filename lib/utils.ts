import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  if (!name) return "";
  const parts = name.split(" ");
  const initials = parts
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
  return initials;
}

export function dueDateTimeCaculation(borrowDate: string, dueDate: string) {
  const borrowDateStr = new Date(borrowDate);
  const dueDateStr = new Date(dueDate);
  const currentDate = new Date();

  // Calculate the elapsed time from borrowDate to today
  const elapsedMs = currentDate.getTime() - borrowDateStr.getTime();

  // Calculate the remaining time before due date
  const remainingMs = dueDateStr.getTime() - currentDate.getTime();

  // If remainingMs is negative, the book is overdue
  if (remainingMs < 0) {
    return "Overdue";
  }

  // Convert milliseconds into days, hours, minutes, and seconds
  const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
  return `Remaining Time: ${days} days, ${hours} hours`;
}

export function formattedDateMonthDay(dateString: string) {
  const date = new Date(dateString);

  interface OptionDate {
    month: "short" | "numeric" | "2-digit" | "long" | "narrow";
    day: "2-digit" | "numeric";
    year: "numeric" | "2-digit";
    timeZone: string;
  }

  const options = {
    month: "short",
    day: "2-digit",
    year: "numeric" as "2-digit" | "numeric",
    timeZone: "Asia/Manila",
  };

  const formattedDate = date.toLocaleDateString("en-US", options as OptionDate);

  return `Borrowed on ${formattedDate}`;
}
