import { MongoClient } from 'mongodb';

const globalMongo = globalThis;

export class MongoConfigurationError extends Error {
  constructor() {
    super('MongoDB is not configured. Set MONGODB_URI in .env.local or .env.');
    this.name = 'MongoConfigurationError';
  }
}

function getMongoUri() {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri || /[<>]|xxxxx|username|password/i.test(uri)) throw new MongoConfigurationError();
  return uri;
}

export function isMongoConfigured() {
  try {
    getMongoUri();
    return true;
  } catch {
    return false;
  }
}

export async function getDatabase() {
  const uri = getMongoUri();

  if (!globalMongo.__massDestructionMongoPromise || globalMongo.__massDestructionMongoUri !== uri) {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      maxPoolSize: 10,
    });
    globalMongo.__massDestructionMongoUri = uri;
    globalMongo.__massDestructionMongoPromise = client.connect().catch((error) => {
      globalMongo.__massDestructionMongoPromise = null;
      throw error;
    });
  }

  const client = await globalMongo.__massDestructionMongoPromise;
  return client.db(process.env.MONGODB_DB || 'massdestruction');
}

export async function getNewsCollection() {
  return (await getDatabase()).collection('news');
}

export async function getGuestbookCollection() {
  return (await getDatabase()).collection('guestbook');
}
