"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href={"/"}>
        <Image src="/icons/logo.svg" alt="BookWise" height={40} width={40} />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <Link
          href={"/library"}
          className={cn(
            "text-base cursor-pointer capitilize",
            pathname === "/library" ? "text-light-200" : "text-light-100"
          )}
        >
          library
        </Link>
      </ul>
    </header>
  );
};

export default Header;
