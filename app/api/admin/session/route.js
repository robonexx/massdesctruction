import { hasAdminSession } from '../../../lib/admin-session';

export async function GET() {
  const authenticated = await hasAdminSession();
  return Response.json({ authenticated }, { status: authenticated ? 200 : 401 });
}
