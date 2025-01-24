import { Session } from "next-auth";
import React from "react";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div className="">
        <h2 className="text-2xl font-semibold text-dark-400">
          {session?.user?.email}
        </h2>
        <p className="text-slate-500 text-sm">
          Monitor all your users and books here
        </p>
      </div>

      <p>Search</p>
    </header>
  );
};

export default Header;
