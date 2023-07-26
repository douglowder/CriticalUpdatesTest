import type { MD3Theme } from 'react-native-paper';
import { MD3LightTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

/**
 * Additional colors for banner icon
 */
export type AdditionalColors = { red: string; yellow: string; green: string; blue: string };

/**
 * Add styles to the theme properties
 */
export type DemoTheme = MD3Theme & {
  styles: StyleSheet.NamedStyles<any>;
  colors: typeof MD3LightTheme.colors & AdditionalColors;
};
