"use client";

import { useEffect, useState } from "react";

type UndoToastProps = {
  message: string;
  onUndo: () => void;
  onExpire: () => void;
};

export default function UndoToast({ message, onUndo, onExpire }: UndoToastProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onExpire, 300);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onExpire]);

  const handleUndo = () => {
    setExiting(true);
    setTimeout(onUndo, 150);
  };

  return (
    <div
      className={`fixed left-4 right-4 z-50 transition-all duration-300 ${
        exiting ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
      }`}
      style={{ bottom: "72px" }}
    >
      <div className="bg-gray-900 text-white rounded-xl px-4 py-3 flex items-center justify-between shadow-lg">
        <span className="text-sm">{message}</span>
        <button
          onClick={handleUndo}
          className="text-messenger-blue text-sm font-semibold ml-3 flex-shrink-0 hover:text-blue-300 transition-colors"
        >
          Undo
        </button>
      </div>
    </div>
  );
}
