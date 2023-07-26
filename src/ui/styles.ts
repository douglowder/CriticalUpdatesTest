import type { MD3Theme } from 'react-native-paper';
import type { AdditionalColors } from './types';
import { StyleSheet } from 'react-native';

/**
 * Dynamically generate the styles we need using the chosen MD3 theme and our additional colors
 */
export const themedStyles = (theme: MD3Theme, additionalColors: AdditionalColors) =>
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
      marginRight: 24,
    },
    listSectionTitleText: {
      fontWeight: 'bold',
      fontSize: 24,
      color: theme.colors.tertiary,
    },
    listItem: {
      margin: 0,
      width: '100%',
      padding: 0,
    },
    listItemTitleText: {
      fontWeight: 'bold',
      fontSize: 14,
      paddingBottom: 5,
      color: theme.colors.primary,
    },
    listItemDescriptionText: {
      fontSize: 12,
      color: theme.colors.secondary,
      flexWrap: 'wrap',
    },
    monitorContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: additionalColors.blue,
      color: theme.colors.inverseOnSurface,
    },
    monitorModalContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.secondaryContainer,
    },
    monitorModalTitle: {
      fontWeight: 'bold',
      margin: 20,
      color: theme.colors.tertiary,
    },
    monitorLabel: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    monitorLabelText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.inverseOnSurface,
    },
    monitorIcon: {
      width: 30,
      height: 30,
      topMargin: 70,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: additionalColors.green,
    },
    monitorIconInfo: {
      backgroundColor: additionalColors.yellow,
    },
    monitorIconWarning: {
      backgroundColor: additionalColors.red,
    },
    buttonStyle: {
      margin: 15,
      borderRadius: 8,
    },
    switchStyle: {
      flexDirection: 'row',
      margin: 15,
      paddingLeft: 5,
      paddingRight: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    controlText: {
      fontSize: 14,
    },
    activityIndicatorStyle: {
      position: 'absolute',
      bottom: 20,
      right: '50%',
    },
  });
