// Construct RNPaper themes with the additional properties we need

import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import type { AdditionalColors, DemoTheme } from './types';
import { themedStyles } from './styles';

import {
  darkTheme as expoDarkTheme,
  lightTheme as expoLightTheme,
  palette,
} from '@expo/styleguide-base';

const lightAdditionalColors: AdditionalColors = {
  red: palette.light.red10,
  yellow: palette.light.yellow8,
  green: palette.light.green10,
  blue: palette.light.blue11,
};

const darkAdditionalColors: AdditionalColors = {
  red: palette.dark.red10,
  yellow: palette.dark.yellow10,
  green: palette.dark.green10,
  blue: palette.light.blue7,
};

const lightPaperTheme: MD3Theme = {
  ...MD3LightTheme,
  mode: 'exact',
  colors: {
    ...MD3LightTheme.colors,
    primaryContainer: expoLightTheme.background.screen,
    secondaryContainer: expoLightTheme.background.overlay,
    primary: expoLightTheme.text.default,
    secondary: expoLightTheme.text.secondary,
    tertiary: expoLightTheme.text.tertiary,
  },
};

const darkPaperTheme: MD3Theme = {
  ...MD3DarkTheme,
  mode: 'exact',
  colors: {
    ...MD3DarkTheme.colors,
    primaryContainer: expoDarkTheme.background.screen,
    secondaryContainer: expoDarkTheme.background.overlay,
    primary: expoDarkTheme.text.default,
    secondary: expoDarkTheme.text.secondary,
    tertiary: expoDarkTheme.text.tertiary,
  },
};

const lightTheme: DemoTheme = {
  ...lightPaperTheme,
  styles: themedStyles(lightPaperTheme, lightAdditionalColors),
  colors: {
    ...lightPaperTheme.colors,
    ...lightAdditionalColors,
  },
};

const darkTheme: DemoTheme = {
  ...darkPaperTheme,
  styles: themedStyles(darkPaperTheme, darkAdditionalColors),
  colors: {
    ...darkPaperTheme.colors,
    ...darkAdditionalColors,
  },
};

/**
 * Simple hook to return dark and light precalculated themes
 * @returns the theme
 */
export const useDemoTheme: () => DemoTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
};
