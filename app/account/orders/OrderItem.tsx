import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SquareArrowOutUpRight } from 'lucide-react';
import Image from 'next/image';

interface ShipmentTrackActivity {
  date: string;
  status: string;
  activity: string;
  location: string;
  "sr-status": string;
  "sr-status-label": string;
}
interface TrackingDetails {
  tracking_data: {
    track_status: number;
    shipment_status: number;
    shipment_track: {
      current_status: string;
    }[];
    track_url: string;
    shipment_track_activities: ShipmentTrackActivity[];
  };
}
export function OrderItem({ order }: { order: any }) {
  const [trackingDetails, setTrackingDetails] = useState<TrackingDetails | null>(null);

  useEffect(() => {
    const fetchTrackingDetails = async () => {
      try {
        const shipment_id = order.trackingInfo.shipment_id
        const response = await axios.post(`/api/tracking`, { shipment_id });
        console.log(response.data.data)
        setTrackingDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching tracking details:', error);
      }
    };

    fetchTrackingDetails();
  }, [order.trackingInfo.shipment_id]);

  return (
    <AccordionItem value={order.orderId} className=''>
      <div className='px-4'>
        <AccordionTrigger className='items-start'>
          <div className='text-left'>
            <p>Order ID: {order.orderId}</p>
            <p>Amount: {order.amount.total} ₹</p>
            <p>Status: {trackingDetails ? trackingDetails.tracking_data?.shipment_track[0].current_status || 'Pending' : 'Fetching status...'}</p>
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
                        {
                          item.sku && <span className="leading-tight text-black/50">
                            Variant: {item.sku}
                          </span>
                        }
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
              {
                <Link href={order.trackingInfo.tracking_url} rel="noopener noreferrer" target='_blank' className='flex items-center gap-1'>
                  Track Order <SquareArrowOutUpRight size={16} />
                </Link>}
              {trackingDetails.tracking_data?.shipment_track_activities && <p>Tracking Details:</p>}
              <ul>
                {trackingDetails.tracking_data?.shipment_track_activities?.map((activity, index) => (
                  <li key={index}>
                    <strong>Date:</strong> {activity.date}<br />
                    <strong>Status:</strong> {activity.status} ({activity["sr-status-label"]})<br />
                    <strong>Activity:</strong> {activity.activity}<br />
                    <strong>Location:</strong> {activity.location}<br />
                  </li>
                ))}
              </ul>
            </>
          )}
        </AccordionContent>

      </div>
    </AccordionItem>
  );
};