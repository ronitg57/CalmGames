import type { Metadata, Viewport } from 'next';
import './globals.css';
import JsonLd from '@/components/JsonLd';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f9fafb',
};

export const metadata: Metadata = {
  title: {
    default: 'CalmGames — Free Mental Wellness Games for Anxiety & Stress Relief',
    template: '%s | CalmGames',
  },
  description: 'Discover 10 free calming games designed to reduce anxiety, manage stress, and improve focus. Breathe, journal, meditate, and find your peace with CalmGames — your personal mental wellness sanctuary.',
  keywords: [
    'anxiety relief',
    'stress management',
    'mental wellness',
    'calming games',
    'meditation app',
    'breathing exercises',
    'anxiety games',
    'stress relief games',
    'mental health app',
    'mindfulness activities',
    'panic attack help',
    'focus training',
    'relaxation techniques',
    'self-care app',
    'emotional wellness',
  ],
  authors: [{ name: 'Ronit Goswami' }],
  creator: 'Ronit Goswami',
  publisher: 'CalmGames',
  metadataBase: new URL('https://calmgames.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://calmgames.vercel.app',
    siteName: 'CalmGames',
    title: 'CalmGames — Free Mental Wellness Games for Anxiety & Stress Relief',
    description: 'Discover 10 free calming games designed to reduce anxiety, manage stress, and improve focus. Your personal mental wellness sanctuary.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CalmGames - Mental Wellness Games',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalmGames — Free Mental Wellness Games',
    description: '10 calming games for anxiety relief, stress management, and mindfulness. Free, private, and accessible.',
    images: ['/og-image.png'],
    creator: '@ronitgoswami',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  category: 'health',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#f9fafb" />
        <JsonLd />
      </head>
      <body className="bg-calm-50">{children}</body>
    </html>
  );
}
