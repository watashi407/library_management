"use client";
import React from "react";
import Image from "next/image";
import { adminSideBarLinks } from "@/constant";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn, getInitials } from "@/lib/utils";
import path from "path";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Session } from "next-auth";

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image
            src="/icons/admin/logo.svg"
            alt="logo"
            width={37}
            height={37}
          />
          <h1>Watashi Libro</h1>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;

            return (
              <div key={link.route} className="flex items-center gap-5">
                <Link
                  href={link.route}
                  className={cn(
                    "link",
                    isSelected && "bg-primary-admin shadow-sm"
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icons"
                      fill
                      className={`${isSelected ? "brightness-0 invert" : ""} object-contain`}
                    />
                  </div>
                  <p className={cn(isSelected ? "text-white" : "text-dark")}>
                    {link.text}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="user">
        <Avatar>
          <AvatarFallback className="font-bold bg-primary">
            {getInitials(session?.user?.name as string)}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Sidebar;
