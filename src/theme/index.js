import { light, dark, GOLD, GOLD_DEEP, GOLD_LIGHT, GOLD_DARK, GOLD_GRAD, BLUE_GRAD, NAVY, STATUS } from './colors';
import { createContext, useContext } from 'react';

export { GOLD, GOLD_DEEP, GOLD_LIGHT, GOLD_DARK, GOLD_GRAD, BLUE_GRAD, NAVY, STATUS };

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
};

export const fontSize = {
  xs: 11,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  xxxl: 28,
  display: 34,
};

export const ThemeContext = createContext({ isDark: false, t: light });

export function useTheme() {
  return useContext(ThemeContext);
}

export function getTheme(isDark) {
  return isDark ? dark : light;
}

export { light, dark };
