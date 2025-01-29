"use client";
import { GetUser } from "@/database/schema";
import config from "@/lib/config/config";
import { IKImage } from "imagekitio-next";
import React from "react";

interface Props {
  user: GetUser;
}

const UserProfile = ({ user }: Props) => {
  return (
    <section className=" bg-gradient-to-b from-slate-700 to-slate-900  rounded-lg shadow-lg p-8 mb-6 text-white ">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8 ">
        <div className="w-16 h-16 rounded-full ml-12 bg-gray-800 flex items-center justify-center ">
          <span className="text-xl font-bold">{user.fullName[0]}</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{user.fullName}</h2>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-lg">
              {user.status === "APPROVED" ? (
                <>Verified Student</>
              ) : (
                <>Not Verified Student</>
              )}
            </span>
          </div>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* Student Info Grid */}
      <div className="flex flex-col gap-4 indent-10">
        <div className="space-y-1 ">
          <p className="text-gray-500">Student ID</p>
          <p className="font-medium">{user.id}</p>
        </div>

        <div className="space-y-1 ">
          <p className="text-gray-500">University</p>
          <p className="font-medium">{user.universityId}</p>
        </div>

        <div className="space-y-1 ">
          <p className="text-gray-500 ">University Card</p>

          <div className="p-2 flex items-center justify-center">
            <IKImage
              path={user.universityCard}
              urlEndpoint={config.env.imagekit.urlEndpoint}
              alt="university card"
              className="rounded-sm object-contain"
              width={500}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
