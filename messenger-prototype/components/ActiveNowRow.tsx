"use client";

import { conversations } from "@/data/conversations";

export default function ActiveNowRow() {
  const onlineFriends = conversations
    .filter((c) => c.category === "friends")
    .flatMap((c) => c.participants)
    .filter((u) => u.isOnline)
    .filter((u, i, arr) => arr.findIndex((x) => x.id === u.id) === i);

  if (onlineFriends.length === 0) return null;

  return (
    <div className="px-4 py-3">
      <h3 className="text-sm font-semibold text-gray-500 mb-3">Active Now</h3>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
        {onlineFriends.map((user) => (
          <div key={user.id} className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="relative">
              <img
                src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=128`}
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover bg-gray-100"
              />
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
