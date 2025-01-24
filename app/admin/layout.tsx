import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

import "@/styles/admin.css";
import Sidebar from "@/components/admin/Sidebar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) return redirect("/sign-in");

  return (
    <main className="flex flex-row m-h-screen w-full">
      <Sidebar />
      <div className="admin-container">
        <p>HEADER</p>
        {children}
      </div>
    </main>
  );
};

export default Layout;
