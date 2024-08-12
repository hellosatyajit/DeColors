import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SquareArrowOutUpRight } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { ReturnDialog } from '@/components/ReturnDialog';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { CancelOrderDialog } from '@/components/CancelOrderDialog';

interface ShipmentTrackActivity {
  date: string;
  status: string;
  activity: string;
  location: string;
  "sr-status": string;
  "sr-status-label": string;
}

// 'CANCELED' | 'OUT FOR PICKUP' | 'PICKUP SCHEDULED' | 'DELIVERED'
interface TrackingDetails {
  status: string
}

export function OrderItem({ order }: { order: any }) {
  const [trackingDetails, setTrackingDetails] = useState<TrackingDetails | null>(null);
  const [invoiceLink, setInvoiceLink] = useState<string>('');
  const [showReturnPopup, setShowReturnPopup] = useState(false);
  const [showCancellationPopup, setShowCancellationPopup] = useState(false);
  const { data: session } = useSession();
  const userinfo = session?.user;

  const fetchTrackingDetails = async () => {
    try {
      const { orderId } = order;
      const response = await axios.post(`/api/tracking`, { orderId }, {
        headers: {
          "Cache-Control": "no-store",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      setTrackingDetails(response.data);
    } catch (error) {
      console.error('Error fetching tracking details:', error);
    }
  };

  const fetchInvoiceLink = async () => {
    try {
      const shipment_id = order.orderId;
      const response = await axios.post(`/api/invoice`, { shipment_id });
      setInvoiceLink(response.data.data.invoice_url);
    } catch (error) {
      console.error('Error fetching tracking details:', error);
    }
  };

  useEffect(() => {
    fetchTrackingDetails();
    fetchInvoiceLink();
  }, [order.orderId]);

  const handleReturnClick = () => {
    setShowReturnPopup(true);
  };

  const handleReturnClose = () => {
    setShowReturnPopup(false);
  };

  const handleReturnSubmit = async (reason: string, otherReason?: string) => {
    const returnDetails = {
      reason,
      otherReason,
      email: userinfo?.email,
      orderId: order.orderId,
    }
    const response = await axios.post('/api/return-order', returnDetails);

    setShowReturnPopup(false);
    if (response.status == 200) {
      toast.success("Return request sended!");
      fetchTrackingDetails();
    }
    else {
      toast.error(response.data.error || 'Return request failed')
    }
  };

  const handleCancellationClose = () => {
    setShowCancellationPopup(false);
  };

  const handleCancellationSubmit = async () => {
    const response = await axios.post('/api/cancel-order', {
      order
    });

    if (response.status == 200) {
      toast.success("Ordered Cancelled!");
      fetchTrackingDetails();
    }
    else {
      toast.error('Order cancellation failed!')
    }
  };


  return (
    <AccordionItem value={order.orderId} className=''>
      <div className='px-4'>
        <AccordionTrigger className='items-start'>
          <div className='text-left'>
            <p>Order ID: {order.orderId}</p>
            <p>Amount: {order.amount.total} ₹</p>
            <p>Status: {trackingDetails ? trackingDetails.status || 'PENDING' : ''}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <p>Shipping Charges: {order.amount.shipping} ₹</p>
          <ul className="flex-grow flex-1">
            {order.cart.map((item: any, index: number) => {
              return (
                <li
                  key={index}
                  className="flex w-full max-w-full flex-col"
                >
                  <div className="relative flex w-full flex-row justify-between px-1 py-4">
                    <div className="z-30 flex flex-row space-x-4">
                      <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300">
                        <Image
                          className="h-full w-full object-cover"
                          width={64}
                          height={64}
                          alt={item.name}
                          src={item.image}
                        />
                      </div>
                      <div className="flex flex-1 flex-col text-base">
                        <span className="leading-tight font-medium text-rose-600">
                          {item.name}
                        </span>
                        {item.sku && <span className="leading-tight text-black/50">
                          Variant: {item.sku}
                        </span>}
                      </div>
                    </div>
                    <div className="flex h-16 flex-col justify-between">
                      <p className="flex justify-end space-y-2 text-right text-sm">
                        {item.price.mrp - item.price.discount} ₹
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          {trackingDetails && (
            <>
              <Link href={order.trackingInfo.tracking_url} rel="noopener noreferrer" target='_blank' className='flex items-center gap-1 hover:underline'>
                Track Order <SquareArrowOutUpRight size={16} />
              </Link>
              <div className='space-y-1 mt-1'>
                {trackingDetails.status !== "CANCELED" && trackingDetails.status !== "DELIVERED" && (
                  <Button
                    variant={'link'}
                    className='font-normal block p-0 h-fit'
                    onClick={() => setShowCancellationPopup(true)}
                  >
                    Cancel the Order
                  </Button>
                )}
                {trackingDetails.status === "DELIVERED" && (
                  <Button
                    variant={'link'}
                    className='font-normal block p-0 h-fit'
                    disabled={order.isReturned}
                    onClick={handleReturnClick}
                  >
                    {order.isReturned ? 'Return Requested' : 'Request Return'}
                  </Button>
                )}
                <Link href={invoiceLink} className='block hover:underline'>Download Invoice</Link>
              </div>
            </>
          )}
        </AccordionContent>
      </div>
      <ReturnDialog
        isOpen={showReturnPopup}
        onClose={handleReturnClose}
        onSubmit={handleReturnSubmit}
      />

      <CancelOrderDialog
        isOpen={showCancellationPopup}
        onClose={handleCancellationClose}
        onSubmit={handleCancellationSubmit}
      />
    </AccordionItem>
  );
}
