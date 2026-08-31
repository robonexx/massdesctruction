import { ObjectId } from 'mongodb';
import { getDatabase } from '../../lib/mongodb';
import { hasAdminSession } from '../../lib/admin-session';

export async function GET() {
  try {
    const db = await getDatabase();
    if (!db) return Response.json([]);

    const items = await db.collection('news').find({}).sort({ _id: -1 }).toArray();
    return Response.json(items.map((item) => ({
      id: item._id.toString(),
      date: item.date,
      n: item.n,
    })));
  } catch (error) {
    console.error('News GET error:', error);
    return Response.json([], { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!(await hasAdminSession())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const { date, n } = body || {};

    if (!date || !n) {
      return Response.json({ error: 'Date and text are required' }, { status: 400 });
    }

    const db = await getDatabase();
    if (!db) {
      return Response.json({ error: 'MongoDB is not configured' }, { status: 503 });
    }

    const result = await db.collection('news').insertOne({ date, n });
    return Response.json({ id: result.insertedId.toString(), date, n }, { status: 201 });
  } catch (error) {
    console.error('News POST error:', error);
    return Response.json({ error: 'Failed to create news entry' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    if (!(await hasAdminSession())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return Response.json({ error: 'Missing id' }, { status: 400 });

    if (!ObjectId.isValid(id)) return Response.json({ error: 'Invalid id' }, { status: 400 });
    const db = await getDatabase();
    if (!db) return Response.json({ error: 'MongoDB is not configured' }, { status: 503 });

    await db.collection('news').deleteOne({ _id: new ObjectId(id) });
    return Response.json({ ok: true });
  } catch (error) {
    console.error('News DELETE error:', error);
    return Response.json({ error: 'Failed to delete news entry' }, { status: 500 });
  }
}
