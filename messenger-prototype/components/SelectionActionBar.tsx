"use client";

type SelectionActionBarProps = {
  selectedCount: number;
  onArchive: () => void;
};

export default function SelectionActionBar({
  selectedCount,
  onArchive,
}: SelectionActionBarProps) {
  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3 animate-fade-in">
      <button
        onClick={onArchive}
        disabled={selectedCount === 0}
        className={`w-full py-3 rounded-full text-[15px] font-semibold transition-colors ${
          selectedCount > 0
            ? "bg-messenger-blue text-white hover:bg-blue-600 active:bg-blue-700"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Archive{selectedCount > 0 ? ` (${selectedCount})` : ""}
      </button>
    </div>
  );
}
