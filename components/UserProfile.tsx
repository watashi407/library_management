"use client";
import { GetUser } from "@/database/schema";
import config from "@/lib/config/config";
import { IKImage } from "imagekitio-next";
import React from "react";

interface Props {
  user: GetUser;
}

const UserProfile = ({ user }: Props) => {
  console.log("This the university card", user.universityCard);
  return (
    <section className="bg-slate-700 rounded-lg shadow-lg p-12 mb-6 text-white">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
          <span className="text-xl font-bold">{user.fullName[0]}</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{user.fullName}</h2>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-lg">
              {user.status === "APPROVED" && <>Verified Student</>}
            </span>
          </div>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* Student Info Grid */}
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-gray-400">Student ID</p>
          <p className="font-medium">{user.id}</p>
        </div>

        <div>
          <p className="text-gray-400">University</p>
          <p className="font-medium">{user.universityId}</p>
        </div>

        <div>
          <p className="text-gray-400">University Card</p>

          <div className="p-2 mt-2">
            <IKImage
              path={user.universityCard}
              urlEndpoint={config.env.imagekit.urlEndpoint}
              alt="university card"
              className="rounded-sm object-fill"
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
