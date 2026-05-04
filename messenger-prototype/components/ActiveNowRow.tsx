"use client";

import { users } from "@/data/conversations";

const avatarColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-indigo-500",
  "bg-red-500",
];

function getAvatarColor(id: string) {
  const index = parseInt(id.replace(/\D/g, "")) % avatarColors.length;
  return avatarColors[index];
}

export default function ActiveNowRow() {
  const onlineUsers = users.filter((u) => u.isOnline);

  if (onlineUsers.length === 0) return null;

  return (
    <div className="px-4 py-3">
      <h3 className="text-sm font-semibold text-gray-500 mb-3">Active Now</h3>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
        {onlineUsers.map((user) => (
          <div key={user.id} className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="relative">
              <div
                className={`w-14 h-14 rounded-full ${getAvatarColor(user.id)} flex items-center justify-center text-white font-bold`}
              >
                {user.avatar}
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <span className="text-[11px] text-gray-600 text-center w-16 truncate">
              {user.name.split(" ")[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
