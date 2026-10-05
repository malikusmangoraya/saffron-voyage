import React from 'react';
import { BRAND } from './BRAND';

/**
 * The Saffron Voyage mark: a gradient tile carrying A cardinal compass with ring, ticks, needle and pivot.
 * Vector only - no raster assets - so it stays crisp at any size and
 * inherits the surrounding layout.
 */
export function BrandMark({ size = 34, className = '', title, ...rest }) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const gid = `bm-{uid}`;
  const label = title || BRAND.name;
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={label}
      {...rest}
    >
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={BRAND.primary} />
          <stop offset="100%" stopColor={BRAND.secondary} />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14.3" fill={`url(#${gid})`} />
      <g transform="translate(14.0 14.0) scale(0.5625)">
        <circle cx='32' cy='32' r='22' fill='none' stroke='#ffffff' stroke-width='4'/><line x1='32' y1='6' x2='32' y2='12' stroke='#ffffff' stroke-width='3' stroke-linecap='round'/><line x1='32' y1='52' x2='32' y2='58' stroke='#ffffff' stroke-width='3' stroke-linecap='round'/><line x1='6' y1='32' x2='12' y2='32' stroke='#ffffff' stroke-width='3' stroke-linecap='round'/><line x1='52' y1='32' x2='58' y2='32' stroke='#ffffff' stroke-width='3' stroke-linecap='round'/><polygon points='32,12 40,32 32,52 24,32' fill='#ffffff'/><polygon points='32,12 40,32 32,32' fill='#09374f'/><polygon points='29,29 35,29 35,35 29,35' fill='#ffffff'/>
      </g>
    </svg>
  );
}

export default BrandMark;
