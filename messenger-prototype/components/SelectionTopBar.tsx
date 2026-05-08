"use client";

type SelectionTopBarProps = {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onClose: () => void;
};

export default function SelectionTopBar({
  selectedCount,
  totalCount,
  onSelectAll,
  onDeselectAll,
  onClose,
}: SelectionTopBarProps) {
  const allSelected = selectedCount === totalCount && totalCount > 0;

  return (
    <div className="bg-white px-4 pt-3 pb-3 border-b border-gray-200 animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <span className="text-[17px] font-semibold text-gray-900">
          {selectedCount} selected
        </span>
        <button
          onClick={allSelected ? onDeselectAll : onSelectAll}
          className="text-messenger-blue text-sm font-semibold hover:text-blue-600 transition-colors"
        >
          {allSelected ? "Deselect All" : "Select All"}
        </button>
      </div>
    </div>
  );
}
