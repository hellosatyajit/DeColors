"use client";
import React, { useEffect, useState } from 'react';
import { OrderItem } from './OrderItem';
import axios from 'axios';
import { useSession } from "next-auth/react";
export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = useSession();
    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const email = session?.user?.email
            if (email) {
            const response = await axios.post('/api/orders',{email});
            console.log(response)
            setOrders(response.data.orders);
            setLoading(false);
            }
            else{
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
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
      if(orders === null){
        return <div>No orders found.</div>;
        
      }
      if (orders.length === 0) {
        return <div>No orders found.</div>;
      }

      return (
        <div>
          <h1>Your Orders</h1>
          {orders.map(order => (
            <OrderItem key={order._id} order={order} />
          ))}
        </div>
      );
    };