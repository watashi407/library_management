import React, { ReactNode } from "react";
import Image from "next/image";

function layout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-2">
            <Image src="/icons/logo.svg" alt="logo" width={37} height={37} />
            <h1 className="text-2xl font-semibold text-white">BookWise</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>

      {children}
    </main>
  );
}

export default layout;
