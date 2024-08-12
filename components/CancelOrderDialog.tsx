import React, { useState } from 'react';
import {
  Dialog,
  DialogPortal,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay
} from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface CancelOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
}

export function CancelOrderDialog({ isOpen, onClose, onSubmit }: CancelOrderDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onSubmit();
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Order Cancellation</DialogTitle>
            <DialogDescription>Are you sure you want to cancel this order? Once cancelled, you will not be able to recover this order or its details.</DialogDescription>
            <DialogClose asChild>
              <button
                aria-label="Close"
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </DialogClose>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={handleSubmit}
              className="mt-4 w-full rounded-md bg-red-500 text-white py-2"
            >
              {isSubmitting ? 'Cancelling...' : 'Cancel Order'}
            </button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}