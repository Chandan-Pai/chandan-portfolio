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
    <html lang="en" style={{ backgroundColor: '#ffffff' }}>
      <head></head>
      <body
        className={`${inter.className} m-0 min-h-dvh bg-white text-slate-900 antialiased [background-color:rgb(255,255,255)]`}
        style={{ backgroundColor: '#ffffff' }}
      >
        <CursorProvider />
        <div
          className="flex min-h-dvh w-full min-w-0 flex-col overflow-x-clip bg-[rgb(255,255,255)]"
          style={{ backgroundColor: '#ffffff', width: '100%' }}
        >
          <div className="min-h-0 min-w-0 flex-1">{children}</div>
          <SiteContactFooter />
        </div>
      </body>
    </html>
  );
}
