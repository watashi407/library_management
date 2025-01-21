"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { Button } from "./ui/button";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  console.log(`Sesion value`, session);
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href={"/"}>
        <Image src="/icons/logo.svg" alt="BookWise" height={40} width={40} />
      </Link>

      <Link
        href={"https://github.com/watashi407/library_management"}
        className="text-white max-sm:hidden"
      >
        THIS ONGOING PROJECT AS OF 1/20/2025: GITHUB TO VALIDATE THE PUSH AND PR
        REQUESTS
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
        {session && (
          <>
            <li>
              <Avatar>
                <AvatarFallback className="font-bold bg-amber-100">
                  {getInitials(session?.user?.name as string)}
                </AvatarFallback>
              </Avatar>
            </li>
            <li>
              <Button onClick={() => signOut()}>Logout</Button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
