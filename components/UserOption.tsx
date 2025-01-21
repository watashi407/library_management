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
import { Button } from "./ui/button";
import { signOutAuth } from "@/lib/actions/auth";
import Link from "next/link";

const UserOption = ({ session }: { session: Session }) => {
  console.log(`Sesion value`, session);
  return (
    <section>
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
          <DropdownMenuItem onClick={signOutAuth}> Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};

export default UserOption;
