import { ObjectId } from 'mongodb';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { getDatabase } from '../../lib/mongodb';
import { hasAdminSession } from '../../lib/admin-session';

const EDIT_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

function hashEditToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

function tokensMatch(token, expectedHash) {
  if (!token || !expectedHash) return false;
  const actual = Buffer.from(hashEditToken(token));
  const expected = Buffer.from(expectedHash);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function GET() {
  try {
    const db = await getDatabase();
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
    const name = body?.name?.trim();
    const message = body?.message?.trim();

    if (!name || !message) {
      return Response.json({ error: 'Name and message are required' }, { status: 400 });
    }
    if (name.length > 60 || message.length > 800) {
      return Response.json({ error: 'Name or message is too long' }, { status: 400 });
    }

    const db = await getDatabase();
    if (!db) {
      return Response.json({ error: 'MongoDB is not configured' }, { status: 503 });
    }

    const now = new Date();
    const editToken = randomBytes(32).toString('base64url');
    const editableUntil = new Date(now.getTime() + EDIT_WINDOW_MS);
    const date = now.toLocaleDateString('sv-SE');
    const time = now.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
    const result = await db.collection('guestbook').insertOne({
      name,
      message,
      date,
      time,
      createdAt: now,
      editableUntil,
      editTokenHash: hashEditToken(editToken),
    });

    return Response.json({
      id: result.insertedId.toString(),
      name,
      message,
      date,
      time,
      editableUntil: editableUntil.toISOString(),
      editToken,
    }, { status: 201 });
  } catch (error) {
    console.error('Guestbook POST error:', error);
    return Response.json({ error: 'Failed to save guestbook entry' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const id = body?.id;
    const editToken = body?.editToken;
    const name = body?.name?.trim();
    const message = body?.message?.trim();

    if (!ObjectId.isValid(id)) return Response.json({ error: 'Invalid id' }, { status: 400 });
    if (!name || !message) return Response.json({ error: 'Name and message are required' }, { status: 400 });
    if (name.length > 60 || message.length > 800) {
      return Response.json({ error: 'Name or message is too long' }, { status: 400 });
    }

    const db = await getDatabase();
    if (!db) return Response.json({ error: 'MongoDB is not configured' }, { status: 503 });

    const entry = await db.collection('guestbook').findOne({ _id: new ObjectId(id) });
    if (!entry) return Response.json({ error: 'Entry not found' }, { status: 404 });
    if (!tokensMatch(editToken, entry.editTokenHash)) {
      return Response.json({ error: 'You cannot edit this entry' }, { status: 403 });
    }
    if (!entry.editableUntil || new Date(entry.editableUntil).getTime() <= Date.now()) {
      return Response.json({ error: 'The 30-day editing period has expired' }, { status: 403 });
    }

    await db.collection('guestbook').updateOne(
      { _id: entry._id },
      { $set: { name, message, updatedAt: new Date() } },
    );

    return Response.json({
      id,
      name,
      message,
      date: entry.date,
      time: entry.time,
    });
  } catch (error) {
    console.error('Guestbook PATCH error:', error);
    return Response.json({ error: 'Failed to update guestbook entry' }, { status: 500 });
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

    await db.collection('guestbook').deleteOne({ _id: new ObjectId(id) });
    return Response.json({ ok: true });
  } catch (error) {
    console.error('Guestbook DELETE error:', error);
    return Response.json({ error: 'Failed to delete guestbook entry' }, { status: 500 });
  }
}
