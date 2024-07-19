"use server";

import { ObjectId, Collection, InsertOneResult } from 'mongodb';
import clientPromise from '../../lib/mongodb';

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

let transactions: Collection<ITransaction>;

async function getTransactionCollection() {
    const client = await clientPromise;
    transactions = client.db().collection<ITransaction>('transaction');
    return transactions;
}

export async function createTransaction(transaction: ITransaction) {
    if (!transactions) {
        await getTransactionCollection();
    }
    const result: InsertOneResult<ITransaction> = await transactions.insertOne(transaction);
    if (!result.insertedId) {
        throw new Error('Failed to insert transaction');
    }
    const insertedTransaction = await transactions.findOne({ _id: result.insertedId });
    return insertedTransaction;
}
