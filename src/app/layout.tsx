import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f9fafb',
};

export const metadata: Metadata = {
  title: 'CalmGames — Anxiety & Stress Relief',
  description: 'A personal, calming web app for anxiety, panic, stress, and concentration support.',
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.json',
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
      </head>
      <body className="bg-calm-50">{children}</body>
    </html>
  );
}
