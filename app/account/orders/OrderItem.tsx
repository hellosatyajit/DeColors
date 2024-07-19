import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
export function OrderItem({order}:any){
    const [trackingDetails, setTrackingDetails] = useState<TrackingDetails | null>(null);

    useEffect(() => {
      const fetchTrackingDetails = async () => {
        try {
          const awb_code = order.trackingInfo.awb_number
          const shipment_id = order.trackingInfo.shipment_id
          const response = await axios.post(`/api/tracking`,{awb_code,shipment_id});
          console.log(response.data.data)
          setTrackingDetails(response.data.data);
        } catch (error) {
          console.error('Error fetching tracking details:', error);
        }
      };
  
      fetchTrackingDetails();
    }, [order.trackingInfo.awb_number]);
  
    return (
      <div>
        <h2>Order ID: {order.OrderId}</h2>
        <p>Amount: {order.amount}</p>
        <p>Status: {trackingDetails ? trackingDetails.tracking_data?.shipment_track[0].current_status : 'Fetching status...'}</p>
        {trackingDetails && (
          <>
            <a href={trackingDetails.tracking_data?.track_url}  rel="noopener noreferrer">
              Track Order 
            </a>
            <h3>Tracking Details:</h3>
            <ul>
              {trackingDetails.tracking_data?.shipment_track_activities.map((activity, index) => (
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
      </div>
    );
  };