"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface YesNoDialogProps {
  onConfirm: () => Promise<void>;
  children: React.ReactNode;
  userName: string;
}

export default function YesNoDialogClearPassword({
  onConfirm,
  children,
  userName,
}: YesNoDialogProps) {
  const [open, setOpen] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsClearing(true);
      await onConfirm();
    } finally {
      setIsClearing(false);
      setOpen(false);
    }
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={handleTriggerClick} className="w-full">
        {children}
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to clear {userName}'s password? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button onClick={() => setOpen(false)} disabled={isClearing}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isClearing}
          >
            {isClearing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Clearing...
              </>
            ) : (
              "Clear Password"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
