import { generateButton } from './generate.button';
import type { Palette, Theme } from './types';

export function createDarkTheme(palette: Palette): Theme {
  return {
    button: generateButton({
      palette: palette,
      themeType: 'dark',
    }),
  };
}