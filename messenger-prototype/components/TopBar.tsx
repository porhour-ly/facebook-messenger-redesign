"use client";

export default function TopBar() {
  return (
    <div className="bg-white px-4 pt-3 pb-2">
      {/* Title row */}
      <div className="flex items-center justify-between mb-2.5">
        <h1 className="text-[26px] font-bold text-messenger-blue tracking-tight">messenger</h1>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button className="w-9 h-9 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.04c-5.5 0-10 4.14-10 9.27 0 2.92 1.46 5.53 3.74 7.24V22l3.37-1.85c.9.25 1.85.38 2.89.38 5.5 0 10-4.14 10-9.27S17.5 2.04 12 2.04zm1 12.48l-2.55-2.72L5.18 15l5.76-6.12 2.61 2.72L18.68 9l-5.68 5.52z" />
            </svg>
          </button>
        </div>
      </div>
      {/* Search bar */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-9 pr-4 py-2 bg-messenger-gray rounded-full text-sm outline-none placeholder:text-gray-500"
          readOnly
        />
      </div>
    </div>
  );
}
