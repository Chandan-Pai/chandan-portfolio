import { Inter } from 'next/font/google';
import './globals.css';
import CursorProvider from './components/CursorProvider';
import SiteContactFooter from './components/SiteContactFooter';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Chandan Pai',
  description: 'Human Factors Engineer & UX Researcher',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <CursorProvider />
        {children}
        <SiteContactFooter />
      </body>
    </html>
  );
}
