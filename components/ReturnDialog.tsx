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

interface ReturnDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, otherReason?: string) => void;
}

export function ReturnDialog({ isOpen, onClose, onSubmit }: ReturnDialogProps) {
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const handleSubmit = () => {
    if (reason === 'Other' && otherReason.trim() === '') {
      alert('Please specify the reason');
      return;
    }
    setReason('')
    setOtherReason('')
    onSubmit(reason, otherReason);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Return Product</DialogTitle>
            <DialogClose asChild>
              <button
                aria-label="Close"
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </DialogClose>
          </DialogHeader>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Reason for return:
            </label>
            <div className="mt-2 space-y-2">
              <div>
                <input
                  type="radio"
                  id="defective"
                  name="reason"
                  value="Product was defective or wasn't as described"
                  onChange={(e) => setReason(e.target.value)}
                />
                <label htmlFor="defective" className="ml-2">
                  Product was defective or wasn't as described
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="misplaced"
                  name="reason"
                  value="Product was misplaced with other product"
                  onChange={(e) => setReason(e.target.value)}
                />
                <label htmlFor="misplaced" className="ml-2">
                  Product was misplaced with other product
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="other"
                  name="reason"
                  value="Other"
                  onChange={(e) => setReason(e.target.value)}
                />
                <label htmlFor="other" className="ml-2">
                  Other
                </label>
                {reason === 'Other' && (
                  <textarea
                    className="mt-2 w-full rounded-md border border-gray-300 p-2"
                    placeholder="Please specify the reason"
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                  />
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={handleSubmit}
              className="mt-4 w-full rounded-md bg-red-500 text-white py-2"
            >
              Submit
            </button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}