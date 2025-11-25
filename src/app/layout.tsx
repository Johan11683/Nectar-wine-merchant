import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import '../styles/globals.scss';
import I18nProvider from './I18nProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://nectar-wine-merchant.vercel.app'), // ← OBLIGATOIRE

  title: 'Nectar Wine Merchant',
  description: 'Négociant bordelais de vins d’exception.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Nectar Wine Merchant',
    description: 'Fine wine merchant based in Bordeaux, sourcing exceptional wines worldwide.',
    url: 'https://nectar-wine-merchant.vercel.app/',
    siteName: 'Nectar Wine Merchant',
    images: [
      {
        url: '/og-image.png', // ton image 1200x630
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
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
