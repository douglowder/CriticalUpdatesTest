import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { StyleSheet } from 'react-native';

export const themedStyles = (theme: MD3Theme) =>
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

export const useTheme: () => MD3Theme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
};

export default useTheme;
