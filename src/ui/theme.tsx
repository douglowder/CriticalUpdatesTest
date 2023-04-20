// RN Paper theme, extended for this project, and some styled components

import React from 'react';
import {
  MD3DarkTheme,
  MD3LightTheme,
  useTheme,
  List,
  Button as PaperButton,
  Portal,
  Modal as PaperModal,
} from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { StyleSheet, SafeAreaView, Pressable, View } from 'react-native';
import {
  darkTheme as expoDarkTheme,
  lightTheme as expoLightTheme,
  palette,
} from '@expo/styleguide-base';

type MonitorColors = { red: string; yellow: string; green: string };
/**
 * Add styles to the theme properties
 */
export type DemoTheme = MD3Theme & {
  styles: StyleSheet.NamedStyles<any>;
  monitorColors: MonitorColors;
};

const themedStyles = (theme: MD3Theme, monitorColors: MonitorColors) =>
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
      color: theme.colors.tertiary,
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
      color: theme.colors.secondary,
    },
    monitorContainer: {
      height: 100,
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
      color: theme.colors.tertiary,
    },
    monitor: {
      width: 30,
      height: 30,
      topMargin: 70,
      borderRadius: 15,
      backgroundColor: monitorColors.green,
    },
    monitorUpdate: {
      backgroundColor: monitorColors.yellow,
    },
    monitorCritical: {
      backgroundColor: monitorColors.red,
    },
    buttonStyle: {
      margin: 20,
      borderRadius: 8,
    },
  });

const lightPaperTheme: MD3Theme = {
  ...MD3LightTheme,
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
  colors: {
    ...MD3DarkTheme.colors,
    primaryContainer: expoDarkTheme.background.screen,
    secondaryContainer: expoDarkTheme.background.overlay,
    primary: expoDarkTheme.text.default,
    secondary: expoDarkTheme.text.secondary,
    tertiary: expoDarkTheme.text.tertiary,
  },
};

const lightMonitorColors = {
  red: palette.light.red10,
  yellow: palette.light.yellow10,
  green: palette.light.green10,
};

const darkMonitorColors = {
  red: palette.dark.red10,
  yellow: palette.dark.yellow10,
  green: palette.dark.green10,
};

const lightTheme: DemoTheme = {
  ...lightPaperTheme,
  styles: themedStyles(lightPaperTheme, lightMonitorColors),
  monitorColors: lightMonitorColors,
};

const darkTheme: DemoTheme = {
  ...darkPaperTheme,
  styles: themedStyles(darkPaperTheme, darkMonitorColors),
  monitorColors: darkMonitorColors,
};

/**
 * Simple hook to return dark and light precalculated themes
 * @returns the theme
 */
export const useDemoTheme: () => DemoTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
};

// Some styled components to reuse

export const Container = (props: any) => {
  const { styles } = useTheme<DemoTheme>();
  return <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>;
};

export const Spacer = () => {
  const { styles } = useTheme<DemoTheme>();
  return <View style={styles.spacer} />;
};

export const Section = (props: any) => {
  const { styles } = useTheme<DemoTheme>();
  return (
    <List.Section {...props} style={styles.listSection} titleStyle={styles.listSectionTitleText}>
      {props.children}
    </List.Section>
  );
};

export const Item = (props: any) => {
  const { styles } = useTheme<DemoTheme>();
  return (
    <List.Item
      {...props}
      style={styles.listItem}
      titleStyle={styles.listItemTitleText}
      descriptionStyle={styles.listItemDescriptionText}
    />
  );
};

export const Button = (props: any) => {
  const { styles, colors } = useTheme<DemoTheme>();
  return (
    <PaperButton
      {...props}
      buttonColor={colors.tertiary}
      onPress={props.onPress}
      style={styles.buttonStyle}
      mode="contained">
      {props.children}
    </PaperButton>
  );
};

export const Modal = (props: any) => {
  const { styles } = useTheme<DemoTheme>();
  return (
    <Portal>
      <PaperModal {...props} contentContainerStyle={styles.monitorModalContainer}>
        {props.children}
      </PaperModal>
    </Portal>
  );
};

export const Monitor = (props: any) => {
  const { styles } = useTheme<DemoTheme>();
  const monitorStyle = props.isUpdateAvailable
    ? props.isUpdateCritical
      ? [styles.monitor, styles.monitorCritical]
      : [styles.monitor, styles.monitorUpdate]
    : styles.monitor;
  return (
    <View style={styles.monitorContainer}>
      <Spacer />
      <Pressable onPress={props.onPress} style={monitorStyle} />
      {props.children}
    </View>
  );
};
