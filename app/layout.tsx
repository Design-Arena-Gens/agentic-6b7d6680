import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Affiliate Agent Automation',
  description: 'Automated affiliate marketing agent for product research and posting',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
