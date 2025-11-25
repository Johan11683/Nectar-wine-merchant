import type { ReactNode } from 'react';
import '../styles/globals.scss';
import I18nProvider from './I18nProvider';

export const metadata = {
  title: 'Nectar Wine Merchant',
  description: 'Négociant bordelais de vins d’exception.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
