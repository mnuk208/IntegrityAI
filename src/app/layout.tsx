'use client';

import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import { Header } from '../components/Header';
import { ThemeProvider } from '../components/ThemeProvider';
import { FeedbackButton } from '../components/FeedbackButton';
import Footer from '../components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// Check if running in the browser and enable MSW
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const { worker } = require('../../mocks/browser');
  worker.start({ onUnhandledRequest: 'bypass' });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen bg-background text-foreground antialiased`}>
        <ThemeProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          {pathname !== '/responsible-use' && <FeedbackButton />}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}






