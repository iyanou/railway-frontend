import './globals.css'
import type { Metadata } from 'next'
import { NextAuthProvider } from './providers'

export const metadata: Metadata = {
  title: 'ElasticDoctor - Elasticsearch Health Diagnostics',
  description: 'Comprehensive health checks for Elasticsearch clusters across versions 5.x - 9.x with expert recommendations',
  keywords: 'elasticsearch, health check, diagnostics, cluster monitoring, performance optimization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
