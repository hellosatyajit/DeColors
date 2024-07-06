import clientPromise from "@/lib/mongodb";
import { MongoClient, ObjectId } from "mongodb";

function createUpdateObject<U>(field: string, value: U): Record<string, U> {
  const updateObject: Record<string, U> = {};
  updateObject[field] = value;
  return updateObject;
}

export class Repository<T> implements IRepository<T> {
  private collection: string;

  constructor(collection: string) {
    this.collection = collection;
  }

  async find(
    filter: Partial<T>,
    page: number = 1,
    limit: number = 10,
    projection?: Partial<Record<keyof T, 1 | 0>>
  ): Promise<{ data: T[]; totalCount: number }> {
    try {
      const client: MongoClient = await clientPromise;
      const skip = (page - 1) * limit;
      const collection = client.db().collection(this.collection);
      const totalCount = await collection.countDocuments(filter);
      const data = await collection
        .find(filter, { projection })
        .skip(skip)
        .limit(limit)
        .toArray();

      return { data: data as unknown as T[], totalCount };
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("ECONNREFUSED")) {
          console.error("Failed to connect to MongoDB. Connection refused.");
        } else {
          console.error("An error occurred:", error.message);
        }
      }
      return { data: [], totalCount: 0 };
    }
  }

  async update(id: string, update: Partial<T>): Promise<void> {
    try {
      const client: MongoClient = await clientPromise;
      const collection = client.db().collection(this.collection);
      await collection.updateOne({ _id: new ObjectId(id) }, { $set: update });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      }
    }
  }

  async updateArray<U>(id: string, field: string, value: U): Promise<void> {
    try {
      const client: MongoClient = await clientPromise;
      const collection = client.db().collection(this.collection);
      const updateObject = createUpdateObject(field, value);
      await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateObject });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      }
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      const client: MongoClient = await clientPromise;
      const collection = client.db().collection(this.collection);
      const item = await collection.findOne({ _id: new ObjectId(id) });
      return item as unknown as T | null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      }
      return null;
    }
  }
  async findByName(name: string): Promise<T | null> {
    try {
      const client: MongoClient = await clientPromise;
      const collection = client.db().collection(this.collection);
      const item = await collection.findOne({ name: name });
      return item as unknown as T | null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      }
      return null;
    }
  }

  async updateByName(name: string, update: Partial<T>): Promise<void> {
    try {
      const client: MongoClient = await clientPromise;
      const collection = client.db().collection(this.collection);
      await collection.updateOne({ name: name }, { $set: update });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      }
    }
  }
  
}
