'use client';

import { usePathname } from 'next/navigation';
import SiteContactFooter from './SiteContactFooter';

function normalizePathname(pathname) {
  if (pathname == null || pathname === '') return '';
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function stripAppBase(pathname, basePath) {
  const norm = normalizePathname(pathname);
  const b = normalizePathname(basePath || '');
  if (!b) return norm || '/';
  if (norm === b) return '/';
  if (norm.startsWith(`${b}/`)) {
    const rest = norm.slice(b.length);
    return rest || '/';
  }
  return norm || '/';
}

export default function ConditionalSiteContactFooter() {
  const pathname = usePathname();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const route = stripAppBase(pathname, basePath);
  const isHome = route === '/' || route === '';
  if (isHome) return null;
  return <SiteContactFooter />;
}
