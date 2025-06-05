import { ReactNode } from "react";
import { Input } from "@/components/ui/input";

interface ToolbarWithSearchAndActionProps {
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
  actionLabel: string;
  actionIcon?: ReactNode;
  onActionClick: () => void;
  actionButtonClassName?: string;
  children?: ReactNode; // For dialogs or extra actions
}

export function ToolbarWithSearchAndAction({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  actionLabel,
  actionIcon,
  onActionClick,
  actionButtonClassName = "text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto",
  children,
}: ToolbarWithSearchAndActionProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 w-full">
      <Input
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={onSearchChange}
        className="w-full max-w-sm h-11"
      />
      <div className="flex items-center justify-end w-full sm:w-auto mt-2 sm:mt-0">
        <button className={actionButtonClassName} onClick={onActionClick}>
          <div className="flex items-center justify-center">
            {actionIcon}
            {actionIcon ? (
              <span className="ml-2">{actionLabel}</span>
            ) : (
              actionLabel
            )}
          </div>
        </button>
        {children}
      </div>
    </div>
  );
}
