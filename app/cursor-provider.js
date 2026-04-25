'use client';

import { useEffect } from 'react';

export function CursorProvider({ children }) {
  useEffect(() => {
    // Create custom cursor element
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.style.opacity = '1';
    });

    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });

    // Add hover effect on clickable elements (exclude back button)
    document.querySelectorAll('a:not([data-no-cursor-hover]), button:not([data-no-cursor-hover]), .card').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', () => {});
      document.removeEventListener('mouseleave', () => {});
      cursor.remove();
    };
  }, []);

  return children;
}