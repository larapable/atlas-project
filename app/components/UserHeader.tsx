"use client";
import { useState } from "react";

export default function UserHeader() {
  const [hasNotification, setHasNotification] = useState(true);
  const [showNotificationBox, setShowNotificationBox] = useState(false);
  const [notifications, setNotifications] = useState([
    "Notification 1",
    "Notification 2",
    "Notification 3",
    // Add more notifications as needed
  ]);

  const toggleNotificationBox = () => {
    setShowNotificationBox(!showNotificationBox);
    // You can add further logic here, like marking notifications as read
  };

  return (
    <div className="bg-white flex pl-10 pr-10 py-10 h-10">
      <div className="shadow-sm bg-[#ffffff] ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset border-opacity-60 rounded-lg w-[38rem] flex items-center px-2 py-2 h-12 mt-[-1.5rem]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          className="w-7 h-7 text-[#B2B0B0]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          placeholder="Type something..."
          className="flex-1 font-medium placeholder-[#807979] bg-transparent focus:outline-none text-[1rem] px-2 py-1 mr-4"
        />
      </div>
      <div className="flex items-center ml-auto">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 text-[#686666]"
            onClick={toggleNotificationBox}
          >
            <path
              fill-rule="evenodd"
              d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
              clip-rule="evenodd"
            />
          </svg>

          {hasNotification && (
            <span className="absolute top-0 right-0 block h-3 w-3 bg-red-500 rounded-full"></span>
          )}

          {showNotificationBox && (
            <div className="absolute top-10 right-0 w-56 p-4 bg-white shadow-2xl font-semibold rounded-md">
              {notifications.map((notification) => (
                <div className="text-[#686666] text-lg">{notification}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
