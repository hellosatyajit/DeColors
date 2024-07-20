import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export interface IOrder {
  userId: ObjectId | undefined;
  orderId: string;
  transactionId: ObjectId | undefined;
  amount: number;
  cart: any[];
  trackingInfo: {
    shipment_id: string;
    tracking_url: string;
  };
  createdAt: Date;
}

async function getOrderCollection() {
  const client = await clientPromise;
  return client.db().collection<IOrder>("orders");
}

export async function createOrder(order: IOrder) {
  const orders = await getOrderCollection();
  return orders.insertOne(order);
}
export async function updateOrder(
  transactionId: ObjectId,
  updateFields: Partial<IOrder>
) {
  const orders = await getOrderCollection();
  return orders.updateOne({ transactionId }, { $set: updateFields });
}
export async function findOrdersByUserId(userId: ObjectId) {
  const orders = await getOrderCollection();
  return orders.find({ userId }).sort({ createdAt: -1 }).toArray();
}
