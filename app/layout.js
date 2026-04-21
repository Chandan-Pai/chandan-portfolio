import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Chandan Pai - UX Designer & Product Engineer',
  description: 'Portfolio of UX research, product design, and industrial engineering projects',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          id="custom-cursor"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const cursor = document.createElement('div');
                cursor.className = 'custom-cursor';
                document.body.appendChild(cursor);

                let x = 0, y = 0;
                let targetX = 0, targetY = 0;
                const speed = 0.2;

                document.addEventListener('mousemove', (e) => {
                  targetX = e.clientX;
                  targetY = e.clientY;
                });

                document.addEventListener('mouseenter', () => {
                  cursor.style.opacity = '1';
                });

                document.addEventListener('mouseleave', () => {
                  cursor.style.opacity = '0';
                });

                window.addEventListener('blur', () => {
                  cursor.style.opacity = '0';
                });

                window.addEventListener('focus', () => {
                  cursor.style.opacity = '1';
                });

                document.addEventListener('mouseover', (e) => {
                  if (e.target.closest('.project-link') || e.target.closest('.project-card')) {
                    cursor.classList.add('hover');
                  } else {
                    cursor.classList.remove('hover');
                  }
                });

                document.addEventListener('mouseout', (e) => {
                  if (e.target.closest('.project-link') || e.target.closest('.project-card')) {
                    cursor.classList.remove('hover');
                  }
                });

                function animate() {
                  x += (targetX - x) * speed;
                  y += (targetY - y) * speed;
                  cursor.style.left = x + 'px';
                  cursor.style.top = y + 'px';
                  requestAnimationFrame(animate);
                }
                animate();
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}