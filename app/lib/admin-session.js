import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'md-admin-session';
const SESSION_TTL = 8 * 60 * 60;

function getSecret() {
  return process.env.MD_ADMIN_SESSION_SECRET || process.env.MD_ADMIN_PASS || '';
}

function sign(payload) {
  return createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

export async function createAdminSession() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_TTL * 1000 })).toString('base64url');
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_TTL,
    path: '/',
  });
}

export async function hasAdminSession() {
  const secret = getSecret();
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!secret || !token) return false;
  try {
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return false;
    const expected = Buffer.from(sign(payload));
    const received = Buffer.from(signature);
    if (expected.length !== received.length || !timingSafeEqual(expected, received)) return false;
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return Number(session.exp) > Date.now();
  } catch {
    return false;
  }
}

export async function deleteAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}
