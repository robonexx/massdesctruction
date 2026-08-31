import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const hasUsableUri = Boolean(uri && !/[<>]|xxxxx|username|password/i.test(uri));
let clientPromise = null;

export function isMongoConfigured() {
  return hasUsableUri;
}

export async function getDatabase() {
  if (!hasUsableUri) return null;

  if (!clientPromise) {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    clientPromise = client.connect().catch((error) => {
      clientPromise = null;
      throw error;
    });
  }

  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || 'massdestruction');
}
