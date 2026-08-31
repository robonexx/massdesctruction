# Mass Destruction Archive & Guestbook

A Next.js full-stack application for the Mass Destruction archive with an admin panel, guestbook, and live news updates.

## Features

- **Public Site**: Homepage with news panel and guestbook
- **Hidden Admin Login** (`/md-login`): Secret admin panel behind login
- **Admin Dashboard** (`/md-admin`): Publish news, moderate guestbook entries
- **API Routes**: Full-stack API for news and guestbook management
- **MongoDB Integration**: Optional database persistence (falls back to localStorage)
- **Vercel Ready**: Deploy directly to Vercel with environment variables

## Local Development

### Prerequisites
- Node.js 18+ (latest LTS recommended)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repo-url>
cd massdestruction_2026
```

2. Install dependencies:
```bash
npm install
```

3. Create a local `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Admin Access (Local)

- Navigate to `/md-login`
- Username: `robone`
- Password: `1234dans`
- After login, access `/md-admin` to manage news and guestbook

## Environment Variables

### Required for Local Development
- `NEXT_PUBLIC_MD_ADMIN_USER` - Admin username (visible in browser)
- `NEXT_PUBLIC_MD_ADMIN_PASS` - Admin password (visible in browser)
- `MD_ADMIN_USER` - Admin username (server-side)
- `MD_ADMIN_PASS` - Admin password (server-side)

### Optional for MongoDB (Vercel only)
- `MONGODB_URI` - MongoDB Atlas connection string (keep secret in Vercel)

## Deployment to Vercel

### Quick Deploy

1. Push your repository to GitHub
2. Go to [Vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. Vercel auto-detects Next.js
5. Add environment variables in the Vercel dashboard:
   - `MD_ADMIN_USER`
   - `MD_ADMIN_PASS`
   - `NEXT_PUBLIC_MD_ADMIN_USER` (this will be visible)
   - `NEXT_PUBLIC_MD_ADMIN_PASS` (this will be visible)
   - `MONGODB_URI` (optional, for persistent storage)

6. Deploy!

### MongoDB Atlas Setup (Optional)

If you want persistent storage instead of localStorage:

1. Create a MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and database named `massdestruction`
3. Create a database user and get the connection string
4. In Vercel dashboard, add `MONGODB_URI` with your connection string
5. Add your Vercel IP to MongoDB Atlas IP whitelist (Vercel will prompt you)

## API Routes

- `GET /api/news` - Fetch all news items
- `POST /api/news` - Create news item (requires auth in production)
- `DELETE /api/news?id=...` - Delete news item (requires auth in production)

- `GET /api/guestbook` - Fetch all guestbook entries
- `POST /api/guestbook` - Submit guestbook entry
- `DELETE /api/guestbook?id=...` - Delete guestbook entry (requires auth in production)

- `POST /api/admin/login` - Admin login endpoint

## Pages

- `/` - Homepage with news panel
- `/guestbook` - Public guestbook
- `/md-login` - Admin login (hidden)
- `/md-admin` - Admin dashboard (hidden, requires auth)

## Building for Production

```bash
npm run build
npm start
```

## Security Notes

- Admin credentials are stored in environment variables
- Database credentials are never committed to Git
- `.env` is in `.gitignore`
- On Vercel, keep secrets in the environment variables, not in code
- The `NEXT_PUBLIC_*` variables are visible in the browser (they're intentionally public)

## Support

For issues or questions, contact the project maintainer.
