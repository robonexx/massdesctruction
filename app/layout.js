import './globals.css';

export const metadata = {
  title: 'Mass Destruction',
  description: 'Mass Destruction archive and guestbook.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
