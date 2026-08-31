import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = uri ? new MongoClient(uri) : null;

async function getDb() {
  if (!client) return null;
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db('massdestruction');
}

export async function GET() {
  try {
    const db = await getDb();
    if (!db) return Response.json([]);

    const entries = await db.collection('guestbook').find({}).sort({ _id: -1 }).toArray();
    return Response.json(entries.map((entry) => ({
      id: entry._id.toString(),
      name: entry.name,
      message: entry.message,
      date: entry.date,
      time: entry.time,
    })));
  } catch (error) {
    console.error('Guestbook GET error:', error);
    return Response.json([], { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, message, date, time } = body || {};

    if (!name || !message) {
      return Response.json({ error: 'Name and message are required' }, { status: 400 });
    }

    const db = await getDb();
    if (!db) {
      return Response.json({
        id: `local-${Date.now()}`,
        name,
        message,
        date: date || new Date().toLocaleDateString('sv-SE'),
        time: time || new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
      }, { status: 201 });
    }

    const result = await db.collection('guestbook').insertOne({
      name,
      message,
      date: date || new Date().toLocaleDateString('sv-SE'),
      time: time || new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
    });

    return Response.json({
      id: result.insertedId.toString(),
      name,
      message,
      date: date || new Date().toLocaleDateString('sv-SE'),
      time: time || new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
    }, { status: 201 });
  } catch (error) {
    console.error('Guestbook POST error:', error);
    return Response.json({ error: 'Failed to save guestbook entry' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return Response.json({ error: 'Missing id' }, { status: 400 });

    const db = await getDb();
    if (!db) return Response.json({ ok: true });

    await db.collection('guestbook').deleteOne({ _id: new ObjectId(id) });
    return Response.json({ ok: true });
  } catch (error) {
    console.error('Guestbook DELETE error:', error);
    return Response.json({ error: 'Failed to delete guestbook entry' }, { status: 500 });
  }
}
