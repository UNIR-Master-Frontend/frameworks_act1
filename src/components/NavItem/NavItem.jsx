'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavItem({ path, label, onClick }) {
  const pathname = usePathname();

  const isActive =
    path === '/'
      ? pathname === path
      : pathname.startsWith(path);

  return (
    <li style={{ listStyle: 'none' }}>
      <Link
        href={path}
        className={`nav-link ${isActive ? 'active' : ''}`}
        onClick={onClick}
      >
        {label}
      </Link>
    </li>
  );
}