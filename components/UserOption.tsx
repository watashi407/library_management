"use client";
import React from "react";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { signOutAuth } from "@/lib/actions/auth";
import { useTransition } from "react";
import Link from "next/link";

const UserOption = ({ session }: { session: Session }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <>
      {isPending ? (
        <>
          <div>loading...</div>
        </>
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <Avatar>
                <AvatarFallback className="font-bold bg-primary">
                  {getInitials(session?.user?.name as string)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-bold bg-primary">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => startTransition(async () => await signOutAuth())}
              >
                {" "}
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </>
  );
};

export default UserOption;
