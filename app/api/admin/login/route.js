import { createAdminSession } from '../../../lib/admin-session';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body || {};
    const expectedUser = process.env.MD_ADMIN_USER;
    const expectedPass = process.env.MD_ADMIN_PASS;

    if (!expectedUser || !expectedPass) {
      return Response.json({ ok: false, error: 'Admin login is not configured' }, { status: 503 });
    }

    if (username === expectedUser && password === expectedPass) {
      await createAdminSession();
      return Response.json({ ok: true });
    }

    return Response.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Admin login error:', error);
    return Response.json({ ok: false, error: 'Login failed' }, { status: 500 });
  }
}
