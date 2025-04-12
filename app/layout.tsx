import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Booking Clone',
  description: 'Booking.com UI Clone',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
