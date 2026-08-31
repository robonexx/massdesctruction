import { ObjectId } from 'mongodb';
import { getNewsCollection, MongoConfigurationError } from '../../lib/mongodb';
import { hasAdminSession } from '../../lib/admin-session';

export async function GET() {
  try {
    const news = await getNewsCollection();
    const items = await news.find({}).sort({ _id: -1 }).toArray();
    return Response.json(items.map((item) => ({
      id: item._id.toString(),
      date: item.date,
      n: item.n,
    })));
  } catch (error) {
    if (error instanceof MongoConfigurationError) return Response.json([], { status: 503 });
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

    const news = await getNewsCollection();
    const result = await news.insertOne({ date, n, createdAt: new Date() });
    return Response.json({ id: result.insertedId.toString(), date, n }, { status: 201 });
  } catch (error) {
    if (error instanceof MongoConfigurationError) return Response.json({ error: error.message }, { status: 503 });
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
    const news = await getNewsCollection();
    await news.deleteOne({ _id: new ObjectId(id) });
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof MongoConfigurationError) return Response.json({ error: error.message }, { status: 503 });
    console.error('News DELETE error:', error);
    return Response.json({ error: 'Failed to delete news entry' }, { status: 500 });
  }
}
