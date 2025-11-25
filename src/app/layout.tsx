import type { ReactNode } from 'react';
import '../styles/globals.scss';

export const metadata = {
  title: 'Nectar Wine Merchant',
  description: 'Négociant bordelais de vins d’exception.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
