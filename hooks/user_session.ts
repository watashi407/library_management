import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export const checkUserSession = async () => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  return session;
};

export const checkAdminSession = async () => {
  const session = await auth();

  if (!session?.user?.id) return redirect("/sign-in");

  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN");

  if (!isAdmin) return redirect("/");

  return session;
};
