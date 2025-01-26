import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

import "@/styles/admin.css";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) return redirect("/sign-in");

  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN");

  if (!isAdmin) return redirect("/");

  // after(async () => {
  //   if (!session?.user?.id) return;

  //   // check if the lastActivityDate is Today

  //   const user = await db
  //     .select()
  //     .from(users)
  //     .where(eq(users.id, session?.user.id))
  //     .limit(1);

  //   if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
  //     return;

  //   await db
  //     .update(users)
  //     .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
  //     .where(eq(users.id, session?.user.id));
  // });

  return (
    <main className="flex flex-row m-h-screen w-full">
      <Sidebar session={session} />
      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
};

export default Layout;
