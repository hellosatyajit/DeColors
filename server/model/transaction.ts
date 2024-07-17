"use server";

import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export interface ICartItem {
    productId: string;
    name: string;
    quantity: number;
    price: {
      mrp: number;
      discount: number;
    };
    images: string;
    url: string;
    slug: string;
    subheading: string;
    brand: string;
    category: string;
    type: string;
  }
  
  export interface ITransaction {
    userId: ObjectId | undefined;
    orderCreationId: string;
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;
    amount: number;
    cart: ICartItem[];
    status: string;
    createdAt: Date;
  }
  async function getUserCollection() {
    const client = await clientPromise;
    return client.db().collection<ITransaction>("transaction");
  }
  export async function createTransaction(transaction: ITransaction) {
    const transactions = await getUserCollection();
    return transactions.insertOne(transaction);
  }