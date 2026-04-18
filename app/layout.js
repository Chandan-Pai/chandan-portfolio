import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chandan Pai - HF/UX Portfolio",
  description: "Human Factors Engineer & UX Researcher specializing in data-driven design solutions",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <Script id="custom-cursor" strategy="lazyOnload">{`(function(){
          function initCursor(){
            var cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            document.body.appendChild(cursor);

            var mouseX = 0;
            var mouseY = 0;
            var posX = 0;
            var posY = 0;

            function onMove(e){
              mouseX = e.clientX;
              mouseY = e.clientY;
              cursor.style.opacity = '1';
            }

            function onOver(e){
              try{
                if (e.target.closest('.project-link') || e.target.closest('.project-card')){
                  cursor.classList.add('hover');
                } else {
                  cursor.classList.remove('hover');
                }
              }catch(err){}
            }

            function onLeave(){ cursor.style.opacity = '0'; }
            function onBlur(){ cursor.style.opacity = '0'; }
            function onFocus(){ if (mouseX > 0 || mouseY > 0) cursor.style.opacity = '1'; }

            function loop(){
              posX += (mouseX - posX) * 0.2;
              posY += (mouseY - posY) * 0.2;
              cursor.style.left = (posX - 10) + 'px';
              cursor.style.top = (posY - 10) + 'px';
              requestAnimationFrame(loop);
            }

            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseover', onOver);
            document.addEventListener('mouseleave', onLeave);
            window.addEventListener('blur', onBlur);
            window.addEventListener('focus', onFocus);

            loop();
          }

          if (typeof document !== 'undefined'){
            if (document.readyState === 'loading'){
              document.addEventListener('DOMContentLoaded', initCursor);
            } else { initCursor(); }
          }
        })()`}</Script>
      </body>
    </html>
  );
}