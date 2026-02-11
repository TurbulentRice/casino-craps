/**
 * Color palette for the app
 * Inspired by classic casino colors with modern touches
 */

export const Colors = {
  // Primary - Casino Red
  primary: '#C41E3A',
  primaryDark: '#8B0000',
  primaryLight: '#E63946',

  // Secondary - Casino Green (felt)
  secondary: '#0F5223',
  secondaryDark: '#0A3418',
  secondaryLight: '#228B22',

  // Accent - Gold
  accent: '#FFD700',
  accentDark: '#DAA520',
  accentLight: '#FFEC8B',

  // Neutrals - Light Mode
  light: {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    card: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',
    border: '#E0E0E0',
    divider: '#ECECEC',
    shadow: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Neutrals - Dark Mode
  dark: {
    background: '#0A0A0A',
    surface: '#1A1A1A',
    card: '#1F1F1F',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    textTertiary: '#808080',
    border: '#333333',
    divider: '#2A2A2A',
    shadow: 'rgba(0, 0, 0, 0.5)',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },

  // Table Colors (craps table felt)
  table: {
    felt: '#0F5223',
    feltDark: '#0A3418',
    line: '#FFFFFF',
    passLine: '#FFFFFF',
    dontPass: '#000000',
  },

  // Status Colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',

  // Chip Colors (for betting)
  chips: {
    white: '#FFFFFF',   // $1
    red: '#E63946',     // $5
    green: '#228B22',   // $25
    black: '#1A1A1A',   // $100
    purple: '#9C27B0',  // $500
    yellow: '#FFD700',  // $1000
  },

  // Dice Colors
  dice: {
    white: '#FFFFFF',
    red: '#C41E3A',
    pips: '#1A1A1A',
  },

  // Semantic Colors
  win: '#4CAF50',
  lose: '#F44336',
  push: '#FF9800',
  active: '#2196F3',
  disabled: '#9E9E9E',

  // Transparent variations
  transparent: 'transparent',
  backdrop: 'rgba(0, 0, 0, 0.5)',
};

/**
 * Get theme colors based on dark mode preference
 */
export function getThemeColors(isDark: boolean) {
  return isDark ? Colors.dark : Colors.light;
}

export default Colors;
