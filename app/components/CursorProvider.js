'use client';
import { useEffect } from 'react';

export default function CursorProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

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

    // Handle all interactive elements with cursor effects
    const handleMouseEnter = (e) => {
      if (!(e.target instanceof Element)) return;
      
      const isImage = e.target.closest('[data-cursor-expand]');
      const isProject = e.target.closest('.project-link');
      const target = e.target.closest('[data-cursor-expand], .project-link');
      
      if (target && !target.hasAttribute('data-no-cursor-hover')) {
        cursor.classList.add('hover');
        
        // Update text based on element type
        if (isImage) {
          cursor.setAttribute('data-cursor-text', 'Expand');
        } else if (isProject) {
          cursor.setAttribute('data-cursor-text', 'view project');
        }
      }
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('hover');
      cursor.removeAttribute('data-cursor-text');
    };

    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      cursor.remove();
    };
  }, []);

  return null;
}