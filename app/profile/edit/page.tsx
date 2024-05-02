"use client";
import UserHeader from "@/app/components/UserHeader";
import Navbar from "@/app/components/Navbar";
import UserEditProfile from "@/app/components/EditProfile";

export default function EditProfile() {
  return (
    <div className="flex flex-row w-full h-screen bg-[#E9E9E9]">
      <Navbar/>
      <div className="flex-1">
        <div className="flex-1 flex flex-col mt-8 ml-80">
          <UserEditProfile />
        </div>
      </div>
    </div>
  );
}
