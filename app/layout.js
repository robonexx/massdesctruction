import './globals.css';
import LayoutClient from './LayoutClient';

export const metadata = {
  title: 'Mass Destruction',
  description: 'Mass Destruction archive and guestbook.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
