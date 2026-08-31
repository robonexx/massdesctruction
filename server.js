import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

let client;
let db;

async function connectMongo() {
  if (!mongoUri) {
    console.warn('MONGODB_URI is not set. API will run in fallback/local mode.');
    return;
  }

  try {
    client = new MongoClient(mongoUri);
    await client.connect();
    db = client.db('massdestruction');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

function jsonError(res, message, status = 400) {
  return res.status(status).json({ error: message });
}

app.get('/api/health', async (_req, res) => {
  res.json({
    ok: true,
    mongo: !!db,
    message: 'Mass Destruction API is running',
  });
});

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  const expectedUser = process.env.MD_ADMIN_USER || 'robone';
  const expectedPass = process.env.MD_ADMIN_PASS || '1234dans';

  if (username === expectedUser && password === expectedPass) {
    return res.json({ ok: true });
  }

  return res.status(401).json({ ok: false, error: 'Invalid credentials' });
});

app.get('/api/news', async (_req, res) => {
  if (!db) {
    return res.json([]);
  }

  try {
    const news = await db.collection('news').find({}).sort({ _id: -1 }).toArray();
    const mapped = news.map((item) => ({
      id: item._id.toString(),
      date: item.date,
      n: item.n,
    }));
    return res.json(mapped);
  } catch (error) {
    console.error('News fetch error:', error);
    return jsonError(res, 'Failed to fetch news', 500);
  }
});

app.post('/api/news', async (req, res) => {
  const { date, n } = req.body || {};

  if (!date || !n) {
    return jsonError(res, 'Date and text are required');
  }

  if (!db) {
    return res.json({ date, n });
  }

  try {
    const result = await db.collection('news').insertOne({ date, n });
    return res.status(201).json({
      id: result.insertedId.toString(),
      date,
      n,
    });
  } catch (error) {
    console.error('News save error:', error);
    return jsonError(res, 'Failed to save news', 500);
  }
});

app.get('/api/guestbook', async (_req, res) => {
  if (!db) {
    return res.json([]);
  }

  try {
    const entries = await db.collection('guestbook').find({}).sort({ _id: -1 }).toArray();
    const mapped = entries.map((entry) => ({
      id: entry._id.toString(),
      name: entry.name,
      message: entry.message,
      date: entry.date,
      time: entry.time,
    }));
    return res.json(mapped);
  } catch (error) {
    console.error('Guestbook fetch error:', error);
    return jsonError(res, 'Failed to fetch guestbook', 500);
  }
});

app.post('/api/guestbook', async (req, res) => {
  const { name, message, date, time } = req.body || {};

  if (!name || !message) {
    return jsonError(res, 'Name and message are required');
  }

  if (!db) {
    return res.status(201).json({
      id: `local-${Date.now()}`,
      name,
      message,
      date: date || new Date().toLocaleDateString('sv-SE'),
      time: time || new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
    });
  }

  try {
    const result = await db.collection('guestbook').insertOne({
      name,
      message,
      date: date || new Date().toLocaleDateString('sv-SE'),
      time: time || new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
    });

    return res.status(201).json({
      id: result.insertedId.toString(),
      name,
      message,
      date: date || new Date().toLocaleDateString('sv-SE'),
      time: time || new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
    });
  } catch (error) {
    console.error('Guestbook save error:', error);
    return jsonError(res, 'Failed to save guestbook', 500);
  }
});

app.delete('/api/guestbook/:id', async (req, res) => {
  const { id } = req.params;

  if (!db) {
    return res.json({ ok: true });
  }

  try {
    await db.collection('guestbook').deleteOne({ _id: new ObjectId(id) });
    return res.json({ ok: true });
  } catch (error) {
    console.error('Guestbook delete error:', error);
    return jsonError(res, 'Failed to delete guestbook entry', 500);
  }
});

connectMongo().catch((error) => {
  console.error('Mongo startup error:', error);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
