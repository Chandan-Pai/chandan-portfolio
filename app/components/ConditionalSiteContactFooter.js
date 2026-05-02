'use client';

import { usePathname } from 'next/navigation';
import SiteContactFooter from './SiteContactFooter';

export default function ConditionalSiteContactFooter() {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '';
  if (isHome) return null;
  return <SiteContactFooter />;
}
