// RN Paper theme, extended for this project, and some styled components

import React, { useEffect, useState } from 'react';
import {
  MD3DarkTheme,
  MD3LightTheme,
  useTheme,
  Banner,
  List,
  Button as PaperButton,
  Portal,
  Modal as PaperModal,
  RadioButton,
  Switch as PaperSwitch,
  Text as PaperText,
} from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import {
  darkTheme as expoDarkTheme,
  lightTheme as expoLightTheme,
  palette,
} from '@expo/styleguide-base';

type MonitorColors = { red: string; yellow: string; green: string; blue: string };
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
      backgroundColor: monitorColors.blue,
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
      backgroundColor: monitorColors.green,
    },
    monitorIconInfo: {
      backgroundColor: monitorColors.yellow,
    },
    monitorIconWarning: {
      backgroundColor: monitorColors.red,
    },
    buttonStyle: {
      margin: 20,
      borderRadius: 8,
    },
    switchStyle: {
      flexDirection: 'row',
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
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
  blue: palette.light.blue11,
};

const darkMonitorColors = {
  red: palette.dark.red10,
  yellow: palette.dark.yellow10,
  green: palette.dark.green10,
  blue: palette.light.blue11,
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
      descriptionEllipsizeMode="clip"
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

export const Switch = (props: any) => {
  const { styles, monitorColors } = useTheme<DemoTheme>();
  return (
    <View style={styles.switchStyle}>
      <PaperText style={styles.listItemDescriptionText}>{props.label}</PaperText>
      <Spacer />
      <PaperSwitch {...props} color={monitorColors.green} />
    </View>
  );
};

export const SelectOptions = (props: {
  options: {
    name: string;
    value: string;
  }[];
  defaultValue: string;
  onValueChange: (newValue: string) => void;
}) => {
  const { styles, monitorColors } = useTheme<DemoTheme>();
  const { options, defaultValue, onValueChange } = props;
  const [value, setValue] = useState(defaultValue);
  const handleChange = (newValue: string) => {
    setValue(newValue);
    onValueChange(newValue);
  };
  return (
    <RadioButton.Group onValueChange={(newValue: string) => handleChange(newValue)} value={value}>
      {options.map((option) => {
        const checked = option.value === defaultValue ? 'checked' : 'unchecked';
        return (
          <View key={option.name} style={styles.switchStyle}>
            <PaperText style={styles.listItemDescriptionText}>{option.name}</PaperText>
            <Spacer />
            <RadioButton value={option.value} status={checked} color={monitorColors.blue} />
          </View>
        );
      })}
    </RadioButton.Group>
  );
};

const MonitorIconView = React.forwardRef((props: { type?: 'info' | 'warning' }, ref: any) => {
  const { styles } = useTheme<DemoTheme>();
  const { type } = props;

  const monitorStyle =
    type === 'warning'
      ? [styles.monitorIcon, styles.monitorIconWarning]
      : type === 'info'
      ? [styles.monitorIcon, styles.monitorIconInfo]
      : styles.monitorIcon;
  return <View ref={ref} style={monitorStyle} />;
});

export const Monitor = (props: {
  visible: boolean;
  label: string;
  type?: 'info' | 'warning';
  onPress: () => void;
  children: any;
}) => {
  const { styles, colors } = useTheme<DemoTheme>();
  const { label, type } = props;
  const iconRef = React.useRef(<MonitorIconView />);

  useEffect(() => {
    iconRef.current = <MonitorIconView type={type} />;
  }, [type]);

  return (
    <Banner
      theme={{ colors: { primary: colors.inverseOnSurface } }}
      style={styles.monitorContainer}
      visible={props.visible}
      icon={(_size) => iconRef.current ?? null}
      actions={[{ label: 'Details', onPress: props.onPress }]}>
      <View>
        <PaperText style={styles.monitorLabelText}>{label}</PaperText>
        {props.children}
      </View>
    </Banner>
  );
};
