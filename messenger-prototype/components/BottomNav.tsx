"use client";

type BottomNavProps = {
  unreadCount: number;
};

export default function BottomNav({ unreadCount }: BottomNavProps) {
  return (
    <div className="bg-white border-t border-gray-200 px-2 pb-1">
      <div className="flex items-center justify-around">
        {/* Chats - active */}
        <button className="flex flex-col items-center pt-2 pb-1 px-4 relative">
          <div className="relative">
            <svg className="w-7 h-7 text-messenger-blue" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1.5C6.2 1.5 1.5 5.8 1.5 11c0 2.7 1.2 5.2 3.2 7v3.5l3.2-1.8c.9.3 1.9.4 2.9.4h.2c5.7 0 10.5-4.3 10.5-9.6S17.8 1.5 12 1.5z" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-3 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold text-messenger-blue mt-0.5">Chats</span>
        </button>

        {/* Stories */}
        <button className="flex flex-col items-center pt-2 pb-1 px-4">
          <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
          <span className="text-[10px] font-medium text-gray-500 mt-0.5">Stories</span>
        </button>

        {/* Notifications */}
        <button className="flex flex-col items-center pt-2 pb-1 px-4 relative">
          <div className="relative">
            <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          </div>
          <span className="text-[10px] font-medium text-gray-500 mt-0.5">Notifications</span>
        </button>

        {/* Menu */}
        <button className="flex flex-col items-center pt-2 pb-1 px-4">
          <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="text-[10px] font-medium text-gray-500 mt-0.5">Menu</span>
        </button>
      </div>
    </div>
  );
}
