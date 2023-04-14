import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { StyleSheet } from 'react-native';

export type DemoTheme = MD3Theme & { styles: StyleSheet.NamedStyles<any> };

const themedStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primaryContainer,
    },
    spacer: {
      flex: 1,
    },
    listSection: {
      width: '90%',
    },
    listSectionTitleText: {
      fontWeight: 'bold',
      fontSize: 24,
      color: theme.colors.primary,
    },
    listItem: {
      margin: 10,
      width: '100%',
    },
    listItemTitleText: {
      fontWeight: 'bold',
      fontSize: 14,
      padding: 10,
      color: theme.colors.primary,
    },
    listItemDescriptionText: {
      fontSize: 12,
      color: theme.colors.primary,
    },
    monitorContainer: {
      height: 30,
      width: '90%',
      flexDirection: 'row',
      alignItems: 'flex-end',
      backgroundColor: theme.colors.primaryContainer,
    },
    monitorModalContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.secondaryContainer,
    },
    monitorModalTitle: {
      fontWeight: 'bold',
      margin: 20,
    },
    monitor: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#29ab50', // green
    },
    monitorUpdate: {
      backgroundColor: '#fce24c', // yellow
    },
    monitorCritical: {
      backgroundColor: '#db3421', // red
    },
    buttonStyle: {
      margin: 20,
    },
  });

const lightPaperTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#000000',
    primaryContainer: '#ffffff',
    secondaryContainer: '#eeeeee',
  },
};

const darkPaperTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#ffffff',
    primaryContainer: '#000000',
    secondaryContainer: '#111111',
  },
};

const lightTheme: DemoTheme = {
  ...lightPaperTheme,
  styles: themedStyles(lightPaperTheme),
};

const darkTheme: DemoTheme = {
  ...darkPaperTheme,
  styles: themedStyles(darkPaperTheme),
};

export const useDemoTheme: () => DemoTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
};
