import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

export const BellIcon = ({ size = 22, color = 'currentColor' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 8a6 6 0 0112 0v4l1.5 3h-15L6 12V8z" stroke={color} strokeWidth="1.7" strokeLinejoin="round"/>
    <Path d="M10 18a2 2 0 004 0" stroke={color} strokeWidth="1.7" strokeLinecap="round"/>
  </Svg>
);

export const SearchIcon = ({ size = 18, color = 'currentColor' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth="1.8"/>
    <Path d="M20 20l-3.5-3.5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
  </Svg>
);

export const PlayIcon = ({ size = 18, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M7 5l12 7-12 7V5z"/>
  </Svg>
);

export const FlameIcon = ({ size = 18, color = '#F59E0B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2c1 4-3 5-3 9a3 3 0 006 0c0-1.2-.5-2-1-3 2 .5 4 2.5 4 6a6 6 0 11-12 0c0-5 4-7 6-12z"/>
  </Svg>
);

export const StarIcon = ({ size = 14, color = '#C9A84C' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2l3 6.5 7 .8-5.2 4.7L18.2 22 12 18.5 5.8 22l1.4-8L2 9.3l7-.8L12 2z"/>
  </Svg>
);

export const ArrowLIcon = ({ size = 16, color = 'currentColor' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 6l-6 6 6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const ArrowRIcon = ({ size = 16, color = 'currentColor' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M10 6l6 6-6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const HomeIcon = ({ size = 22, color = 'currentColor', filled = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
    <Path d="M3 11l9-7 9 7v9a2 2 0 01-2 2h-4v-6h-6v6H5a2 2 0 01-2-2v-9z" stroke={color} strokeWidth="1.7" strokeLinejoin="round"/>
  </Svg>
);

export const BookIcon = ({ size = 22, color = 'currentColor', filled = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
    <Path d="M4 4h7a3 3 0 013 3v13a2 2 0 00-2-2H4V4z" stroke={color} strokeWidth="1.7" strokeLinejoin="round"/>
    <Path d="M20 4h-7a3 3 0 00-3 3v13a2 2 0 012-2h8V4z" stroke={color} strokeWidth="1.7" strokeLinejoin="round"/>
  </Svg>
);

export const PathIcon = ({ size = 22, color = 'currentColor' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="6" cy="6" r="2" stroke={color} strokeWidth="1.7"/>
    <Circle cx="18" cy="12" r="2" stroke={color} strokeWidth="1.7"/>
    <Circle cx="6" cy="18" r="2" stroke={color} strokeWidth="1.7"/>
    <Path d="M8 7c4 1 8 3 8 5s-4 4-8 5" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeDasharray="2 2.5"/>
  </Svg>
);

export const TrophyIcon = ({ size = 22, color = 'currentColor', filled = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
    <Path d="M7 4h10v4a5 5 0 01-10 0V4z" stroke={color} strokeWidth="1.7" strokeLinejoin="round"/>
    <Path d="M7 5H4v2a3 3 0 003 3M17 5h3v2a3 3 0 01-3 3M9 13l-1 5h8l-1-5" stroke={color} strokeWidth="1.7" strokeLinejoin="round"/>
    <Path d="M7 20h10" stroke={color} strokeWidth="1.7" strokeLinecap="round"/>
  </Svg>
);

export const UserIcon = ({ size = 22, color = 'currentColor', filled = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
    <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.7"/>
    <Path d="M4 21c1-4 4-6 8-6s7 2 8 6" stroke={color} strokeWidth="1.7" strokeLinecap="round"/>
  </Svg>
);

export const CheckIcon = ({ size = 14, color = 'currentColor' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 12l5 5L20 7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const SparkleIcon = ({ size = 14, color = '#C9A84C' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2z"/>
  </Svg>
);

export const LockIcon = ({ size = 12, color = 'currentColor' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="5" y="11" width="14" height="9" rx="2" stroke={color} strokeWidth="1.8"/>
    <Path d="M8 11V8a4 4 0 018 0v3" stroke={color} strokeWidth="1.8"/>
  </Svg>
);

export const ClockIcon = ({ size = 13, color = 'currentColor' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.7"/>
    <Path d="M12 7v5l3 2" stroke={color} strokeWidth="1.7" strokeLinecap="round"/>
  </Svg>
);

export const UsersIcon = ({ size = 13, color = 'currentColor' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="9" cy="9" r="3.5" stroke={color} strokeWidth="1.7"/>
    <Circle cx="17" cy="10" r="2.5" stroke={color} strokeWidth="1.7"/>
    <Path d="M3 19c.8-3 3-4.5 6-4.5s5.2 1.5 6 4.5M16 16c2 0 4 1 5 3" stroke={color} strokeWidth="1.7" strokeLinecap="round"/>
  </Svg>
);

export const PlusIcon = ({ size = 16, color = 'currentColor' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
  </Svg>
);

export const MenuIcon = ({ size = 20, color = 'currentColor' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 7h16M4 12h16M4 17h10" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
  </Svg>
);

export const ChevronRightIcon = ({ size = 16, color = 'currentColor' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const ChevronDownIcon = ({ size = 16, color = 'currentColor' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const DownloadIcon = ({ size = 16, color = 'currentColor' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 3v12M7 11l5 5 5-5M3 17v1a3 3 0 003 3h12a3 3 0 003-3v-1" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const CompassIcon = ({ size = 20, color = '#C9A84C' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.6"/>
    <Path d="M12 4 L14 12 L12 20 L10 12 Z" fill="#D4B96A"/>
    <Circle cx="12" cy="12" r="1.6" fill="#2B3F7A" stroke={color} strokeWidth="1"/>
  </Svg>
);
