import { Inter } from 'next/font/google';
import './globals.css';
import './project-gutter.css';
import CursorProvider from './components/CursorProvider';
import ConditionalSiteContactFooter from './components/ConditionalSiteContactFooter';
import FirstVisit from './components/FirstVisit';
import RouteTransition from './components/RouteTransition';
import SiteIslandNav from './components/SiteIslandNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Chandan Pai',
  description: 'Human Factors Engineer & UX Researcher',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    /* `data-scroll-behavior="smooth"` keeps CSS smooth scrolling for in-page
       anchors but tells Next to use instant scroll during route transitions
       (otherwise the smooth scroll-to-top after a Link click looks like the
       previous page is animating back up — confusing on the home Work grid). */
    <html lang="en" data-scroll-behavior="smooth" style={{ backgroundColor: '#0a0a0a' }}>
      <head></head>
      <body
        className={`${inter.className} m-0 min-h-dvh bg-neutral-950 text-slate-100 antialiased [background-color:rgb(10,10,10)]`}
        style={{
          backgroundColor: '#0a0a0a',
          paddingLeft: 'env(safe-area-inset-left, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)',
        }}
      >
        <RouteTransition />
        <CursorProvider />
        <FirstVisit />
        <SiteIslandNav />
        <div
          className="flex min-h-dvh w-full min-w-0 flex-col overflow-x-clip bg-neutral-950"
          style={{ backgroundColor: '#0a0a0a', width: '100%' }}
        >
          <div className="min-h-0 min-w-0 flex-1">{children}</div>
          <ConditionalSiteContactFooter />
        </div>
      </body>
    </html>
  );
}
