"use client"

import Link from 'next/link';
import { useState } from 'react';
import {
  IconBellRinging,
  IconHome,
  IconWallet,
  IconSettings,
  IconTools,
  IconReceipt2
} from '@tabler/icons-react';

import classes from './NavbarSimple.module.css';
import { UserButton } from '@/components/UserButton';

const data = [

  { link: '/dashboard', label: 'Dashboard', icon: IconHome },
  { link: '/bankroll', label: 'Bankroll', icon: IconWallet },
  { link: '/tool', label: 'Tools', icon: IconTools },
  { link: '', label: 'Notifications', icon: IconBellRinging },
  { link: '', label: 'Billing', icon: IconReceipt2 },
  { link: '/profile', label: 'Settings', icon: IconSettings },
];

export function NavbarSimple() {
  const [active, setActive] = useState("Dashboard");

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {links}
      </div>
      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}