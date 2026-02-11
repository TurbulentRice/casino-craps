/**
 * Theme configuration and design system
 */

import { Colors } from './colors';

// ============================================================================
// Typography
// ============================================================================

export const Typography = {
  // Font Families
  fonts: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    monospace: 'Courier',
  },

  // Font Sizes
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 48,
  },

  // Font Weights
  weights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  // Line Heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
};

// ============================================================================
// Spacing
// ============================================================================

export const Spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// ============================================================================
// Layout
// ============================================================================

export const Layout = {
  // Container widths
  containerMaxWidth: 1200,
  containerPadding: Spacing.md,

  // Common dimensions
  headerHeight: 60,
  tabBarHeight: 60,
  buttonHeight: {
    sm: 36,
    md: 48,
    lg: 56,
  },

  // Icon sizes
  iconSizes: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 48,
  },

  // Touch target minimum
  minTouchTarget: 44,
};

// ============================================================================
// Border Radius
// ============================================================================

export const BorderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// ============================================================================
// Shadows
// ============================================================================

export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6.27,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 10,
  },
};

// ============================================================================
// Animation Durations
// ============================================================================

export const Animation = {
  durations: {
    fast: 150,
    normal: 250,
    slow: 400,
    slower: 600,
  },
  easing: {
    ease: 'ease' as const,
    easeIn: 'ease-in' as const,
    easeOut: 'ease-out' as const,
    easeInOut: 'ease-in-out' as const,
  },
};

// ============================================================================
// Z-Index
// ============================================================================

export const ZIndex = {
  background: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
};

// ============================================================================
// Breakpoints (for responsive design)
// ============================================================================

export const Breakpoints = {
  xs: 0,
  sm: 375,  // Small phones
  md: 768,  // Tablets
  lg: 1024, // Large tablets / small laptops
  xl: 1280, // Desktops
};

// ============================================================================
// Theme Object (combines all constants)
// ============================================================================

export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  layout: Layout,
  borderRadius: BorderRadius,
  shadows: Shadows,
  animation: Animation,
  zIndex: ZIndex,
  breakpoints: Breakpoints,
};

export type ThemeType = typeof Theme;

export default Theme;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get responsive value based on screen width
 */
export function getResponsiveValue<T>(
  width: number,
  values: { xs?: T; sm?: T; md?: T; lg?: T; xl?: T }
): T | undefined {
  if (width >= Breakpoints.xl && values.xl) return values.xl;
  if (width >= Breakpoints.lg && values.lg) return values.lg;
  if (width >= Breakpoints.md && values.md) return values.md;
  if (width >= Breakpoints.sm && values.sm) return values.sm;
  return values.xs;
}

/**
 * Get spacing value from shorthand
 */
export function spacing(...values: (keyof typeof Spacing)[]): number[] {
  return values.map(v => Spacing[v]);
}
