export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body || {};
    const expectedUser = process.env.MD_ADMIN_USER || 'robone';
    const expectedPass = process.env.MD_ADMIN_PASS || '1234dans';

    if (username === expectedUser && password === expectedPass) {
      return Response.json({ ok: true });
    }

    return Response.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Admin login error:', error);
    return Response.json({ ok: false, error: 'Login failed' }, { status: 500 });
  }
}
