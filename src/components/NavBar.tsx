'use client';

import React from 'react';
import Link from 'next/link';
import { SiCashapp } from 'react-icons/si';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

export const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    {
      label: 'Dashboard',
      href: '/'
    },
    {
      label: 'Issues',
      href: '/issues'
    }
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <SiCashapp />
      </Link>
      <ul className="flex space-x-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={classNames({
              'text-zinc-950': href === currentPath,
              'text-zinc-500': href !== currentPath,
              'hover:text-zinc-800 transition-colors': true
            })}>
            {label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};
