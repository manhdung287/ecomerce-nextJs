import Link from 'next/link';
import React from 'react';
import { ROUTER } from '../untils/router';

export default function NavLink({to,
  text,
  children,
  className,
  title,
  newtab,
  onClick,
  icon}) {
  if (newtab) {
    return <Link
      target="_blank"
      title={title ? title : text ? text : ''}
      href={to ? to : ROUTER.home}>
      <a className={className} >
        {icon}
        {!!text && <span>{text}</span>}
        {children}
      </a>
    </Link>;
  }
  return <Link title={title ? title : text ? text : ''}
    onClick={e => {
      if (onClick) {
        if (e) {
          e.stopPropagation();
        }

        onClick();
      }
    }}
    href={to ? to : ROUTER.home}>
    <a className={className}>
      {icon}
      {!!text && <span>{text}</span>}
      {children}
    </a>
  </Link>;
}