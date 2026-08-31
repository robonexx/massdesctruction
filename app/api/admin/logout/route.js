import { deleteAdminSession } from '../../../lib/admin-session';

export async function POST() {
  await deleteAdminSession();
  return Response.json({ ok: true });
}
