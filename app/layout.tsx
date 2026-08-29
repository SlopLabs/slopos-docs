import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { cn } from '@/lib/cn';
import { appName } from '@/lib/shared';
import './global.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
  'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${appName} Documentation`,
    template: `%s | ${appName}`,
  },
  description:
    'Documentation for SlopOS, a from-scratch x86_64 operating system written in Rust with an enormous amount of AI assistance.',
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0e0a',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(geist.variable, geistMono.variable)}
    >
      <body className="flex min-h-dvh flex-col">
        <RootProvider
          theme={{
            defaultTheme: 'dark',
            forcedTheme: 'dark',
            enableSystem: false,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
