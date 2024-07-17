"use server";

import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export interface UserDocument {
  _id?: ObjectId;
  name: string;
  email: string;
  password?: string;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  address?: {
    address?: string |null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    pinCode?: number | null ;
  };
  phoneNumber?: number | null;
}

async function getUserCollection() {
  const client = await clientPromise;
  return client.db().collection<UserDocument>("users");
}

export async function findUserByEmail(email: string) {
  const users = await getUserCollection();
  return users.findOne({ email });
}

export async function createUser(user: UserDocument) {
  const users = await getUserCollection();
  return users.insertOne(user);
}

export async function updateUser(email: string, updateFields: Partial<UserDocument>) {
  const users = await getUserCollection();
  return users.updateOne({ email }, { $set: updateFields });
}

export async function findUserByResetToken(resetToken: string) {
  const users = await getUserCollection();
  return users.findOne({
    resetToken,
    resetTokenExpiry: { $gte: new Date() },
  });
}

export async function updateUserByResetToken(resetToken: string, updateFields: Partial<UserDocument>) {
  const users = await getUserCollection();
  return users.updateOne({ resetToken }, { $set: updateFields });
}
