'use client';
import { useEffect } from 'react';

export default function CursorProvider() {
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

    // Only add hover effect on homepage project cards (not on project detail pages)
    const isHomePage = window.location.pathname === '/';
    
    if (isHomePage) {
      const addHoverToProjects = () => {
        const projectLinks = document.querySelectorAll('.project-link');
        projectLinks.forEach(el => {
          el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
          el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
      };
      
      setTimeout(addHoverToProjects, 100);
    }

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cursor.remove();
    };
  }, []);

  return null;
}