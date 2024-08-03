"use client";
import React, { useEffect, useState } from 'react';
import { OrderItem } from './OrderItem';
import axios from 'axios';
import { useSession } from "next-auth/react";
import { Accordion } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';

function OrderList() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const email = session?.user?.email
        if (email) {
          const response = await axios.post('/api/orders', { email });
          setOrders(response.data.orders);
          setLoading(false);
        }
        else {
          setOrders([])
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Error fetching orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className='mt-2 space-y-2'>
      <Skeleton className='w-full h-16' />
      <Skeleton className='w-full h-16' />
      <Skeleton className='w-full h-16' />
    </div>;
  }

  if (error) {
    return <p>Something went wrong from our side :(</p>;
  }

  if (orders === null || orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return <Accordion type="single" collapsible>
    {orders.map(order => (
      <OrderItem key={order._id} order={order} />
    ))}
  </Accordion>
}

export default function OrdersPage() {
  return (
    <div className='flex-1 min-h-svh'>
      <p className="font-bold text-lg sm:text-3xl">Your Orders</p>
      <OrderList />
    </div>
  );
};