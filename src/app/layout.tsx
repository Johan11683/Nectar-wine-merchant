import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import '../styles/globals.scss';
import I18nProvider from './I18nProvider';
import NewsletterGate from '../components/NewsletterModal/NewsletterGate';

export const metadata: Metadata = {
  metadataBase: new URL('https://nectar-winemerchant.com'),

  title: 'Nectar Wine Merchant',
  description: 'Négociant bordelais de vins d’exception.',
  icons: {
    icon: '/favicon.png',
  },

  openGraph: {
    title: 'Nectar Wine Merchant',
    description: 'Fine wine merchant based in Bordeaux, sourcing exceptional wines worldwide.',
    url: 'https://nectar-winemerchant.com/',
    siteName: 'Nectar Wine Merchant',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Selection of fine wines by Nectar Wine Merchant',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Nectar Wine Merchant',
    description: 'Fine wine merchant based in Bordeaux, sourcing exceptional wines worldwide.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          {children}
          <NewsletterGate />
          </I18nProvider>
      </body>
    </html>
  );
}
