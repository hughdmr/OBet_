"use client";

import Link from 'next/link';
import { useState } from 'react';
import {
  IconHome,
  IconWallet,
  IconSettings,
  IconTools,
  IconChartArrowsVertical,
  IconAdjustments,
  IconTransform
} from '@tabler/icons-react';

import classes from './Toolbar.module.css';
import { UserButton } from '@/components/UserButton';

const data = [
  { link: '/dashboard', label: 'Dashboard', icon: IconHome },
  { link: '/bankroll', label: 'Bankroll', icon: IconWallet },
  { link: '/tool', label: 'Tool', icon: IconTools },
  { link: '/profile', label: 'Settings', icon: IconSettings },
];

const toolData = [
  { link: '/tool/value', label: 'Fair Odds Calculator', icon: IconChartArrowsVertical},
  { link: '/tool/surebet', label: 'Surebet Calculator', icon: IconAdjustments },
  { link: '/tool/freebet', label: 'Freebet Converter', icon: IconTransform },
];

export function Toolbar() {
  const [active, setActive] = useState("Dashboard");
  const [showToolLinks, setShowToolLinks] = useState(false);

  const handleLinkClick = (label: string) => {
    setActive(label);
    
    if (label === 'Tool') {
      setShowToolLinks(prevState => !prevState);
    } 
  };

  const links = data.map((item) => (
    <div key={item.label}>
      <Link
        className={classes.link}
        data-active={item.label === active || undefined}
        href={item.link}
        onClick={() => handleLinkClick(item.label)}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </Link>
      {item.label === 'Tool' && showToolLinks && toolData.map((tool) => (
        <div key={tool.label} style={{ marginLeft: '20px' }}>
          <Link
            className={classes.link}
            data-active={tool.label === active || undefined}
            href={tool.link}
            onClick={() => handleLinkClick(tool.label)}
          >
        <tool.icon className={classes.linkIcon} stroke={1.5} />
        <span>{tool.label}</span>
          </Link>
        </div>
      ))}
    </div>
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
