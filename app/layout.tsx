import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { getStructuredData, siteDescription } from '@/lib/portfolio-data'
export const metadata: Metadata = {
  metadataBase: new URL('https://junghyun.dev'),
  title: { default: '김정현 / Security Engineer', template: '%s — 김정현' },
  description: siteDescription,
  keywords: [
    'vehicle security',
    'automotive cybersecurity',
    'system security',
    'vulnerability research',
  ],
  authors: [{ name: '김정현' }],
  openGraph: {
    title: '김정현 / Security Engineer',
    description: siteDescription,
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '김정현 / Security Engineer',
    description: siteDescription,
  },
  robots: { index: true, follow: true },
}
export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
{ media: '(prefers-color-scheme: light)', color: '#eae0d7' },
      { media: '(prefers-color-scheme: dark)', color: '#382a10' },
  ],
}
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getStructuredData()),
          }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
