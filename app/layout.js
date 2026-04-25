'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const onMove = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.style.opacity = '1';
    };
    const onLeave = () => { cursor.style.opacity = '0'; };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cursor.remove();
    };
  }, []);

  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}