"use client";
import UserHeader from "@/app/components/UserHeader";
import Navbar from "../components/Navbar";
import UserProfile from "@/app/components/UserProfile";

export default function Profile() {
  return (
    <div className="flex flex-row w-full h-screen bg-[#eeeeee]">
      <div className="flex">
        <Navbar />
      </div>
      <div className="flex-1">
        <div className="flex-1 flex flex-col mt-8 ml-80">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
