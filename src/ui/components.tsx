import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Svg, { Path } from 'react-native-svg';
import {
  useTheme,
  Banner,
  List,
  Button as PaperButton,
  Portal,
  Modal as PaperModal,
  RadioButton,
  Switch as PaperSwitch,
  Text as PaperText,
  ActivityIndicator as PaperActivityIndicator,
} from 'react-native-paper';
import { ScrollView, View } from 'react-native';

import { DemoTheme } from './types';

// Some styled components to reuse

export const Container = (props: any) => {
  const { styles } = useTheme<DemoTheme>();
  return <ScrollView contentContainerStyle={styles.container}>{props.children}</ScrollView>;
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
  const { styles, colors } = useTheme<DemoTheme>();
  return (
    <View style={styles.switchStyle}>
      <PaperText style={styles.controlText}>{props.label}</PaperText>
      <Spacer />
      <PaperSwitch {...props} color={colors.blue} />
    </View>
  );
};

export const ActivityIndicator = (props: { active: boolean }) => {
  const { styles, colors } = useTheme<DemoTheme>();
  return (
    <View style={styles.activityIndicatorStyle}>
      <PaperActivityIndicator
        animating={props.active}
        color={colors.secondary}
        hidesWhenStopped={true}
      />
    </View>
  );
};

export const Logo = (props: { size?: number }) => {
  const { colors } = useTheme<DemoTheme>();
  const { size } = props;
  const iconSize = size ?? 50;
  return (
    <Svg height={`${iconSize}`} width={`${iconSize}`} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M9.477 7.638c.164-.24.343-.27.488-.27.145 0 .387.03.551.27 2.13 2.901 6.55 10.56 6.959 10.976.605.618 1.436.233 1.918-.468.475-.69.607-1.174.607-1.69 0-.352-6.883-13.05-7.576-14.106-.667-1.017-.884-1.274-2.025-1.274h-.854c-1.138 0-1.302.257-1.969 1.274C6.883 3.406 0 16.104 0 16.456c0 .517.132 1 .607 1.69.482.7 1.313 1.086 1.918.468.41-.417 4.822-8.075 6.952-10.977z"
        fill={colors.tertiary}
      />
    </Svg>
  );
};

export const DocsLogo = (props: { size?: number }) => {
  const { colors } = useTheme<DemoTheme>();
  const { size } = props;
  const iconSize = size ?? 50;
  return (
    <Svg height={`${iconSize}`} width={`${iconSize}`} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M12.07 8a.157.157 0 01.166.015l5.374 4.141a.16.16 0 01.055.168l-.37 1.298a.157.157 0 01-.234.09l-4.416-2.768-.846 5.47a.157.157 0 01-.219.12l-1.158-.518a.157.157 0 01-.093-.154l.477-7.132a.157.157 0 01.085-.129L12.069 8z"
        fill={colors.tertiary}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.584.02a.157.157 0 00-.157.001L.708 5.071l-.003.001a.157.157 0 00-.079.135V15.31c0 .056.03.108.079.136l1.71.984.004.003a.157.157 0 00.157 0l1.054-.61v1.183c0 .056.03.108.078.136l1.715.987a.157.157 0 00.156 0l.003-.002 2.024-1.172.91 2.934a.157.157 0 00.198.102l1.815-.594a.156.156 0 00.03-.013l8.732-4.666a.157.157 0 00.075-.186L16.06 4.258a.157.157 0 00-.205-.098l-1.473.529v-1.85a.157.157 0 00-.079-.135l-.002-.001-1.713-.986a.157.157 0 00-.156 0l-1.054.61V1.144a.157.157 0 00-.078-.136L9.584.02zM5.33 9.56l-.003-1.578-1.383-.805v9.74l1.4.806-.014-8.119a.156.156 0 010-.045zM.94 5.48l1.384.805.017 9.741-1.4-.806V5.48zm9.968-4.336l-1.4-.806-8.412 4.87 1.385.806 8.427-4.87zM5.483 7.71l8.427-4.87-1.4-.806-8.411 4.87 1.384.806zm5.09 11.313l-3.21-9.971 8.455-4.519 3.21 9.97-8.456 4.52zM5.678 9.678l3.09 9.967 1.514-.496-3.21-9.972-1.394.501z"
        fill={colors.tertiary}
      />
    </Svg>
  );
};

export const ExpoGoLogo = (props: { size?: number }) => {
  const { colors } = useTheme<DemoTheme>();
  const { size } = props;
  const iconSize = size ?? 50;
  return (
    <Svg height={`${iconSize}`} width={`${iconSize}`} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M18.072 7.75a1.749 1.749 0 00-1.56-.732 1.763 1.763 0 00-1.436.946 1.55 1.55 0 00.302 1.75 2.57 2.57 0 001.716-.484 2.53 2.53 0 00.978-1.48zM12.866 1L11.751.394 6.897 3.072l.387.207.736.383 1.332-.733L12.867.987 12.866 1zm.449-.184a.173.173 0 01.124.115l1.626 4.755a.158.158 0 01-.077.207 3.126 3.126 0 00-1.384 1.519 3.09 3.09 0 00-.134 2.042 3.29 3.29 0 001.35 1.793 3.343 3.343 0 002.195.524.208.208 0 01.202.123l1.68 4.88a.196.196 0 01-.078.215l-5.163 2.992a.195.195 0 01-.078.015.208.208 0 01-.14-.022l-1.81-1.129a.18.18 0 01-.078-.076l-3.538-8.065-5.388 3.039a.25.25 0 01-.21.008l-1.224-.69a.177.177 0 01-.077-.23l5.234-9.847c.02-.033.05-.06.085-.076L11.65.023a.2.2 0 01.186 0l1.479.793zM6.843 3.46l-.256-.13-5.044 9.523.92.514 4.352-5.643a.212.212 0 01.178-.077.217.217 0 01.155.115l4.738 10.82 1.266.775L8.066 4.62l-.216-.614-1.014-.552.007.007zm7.804 5.679a1.932 1.932 0 01.092-1.28c.176-.404.484-.737.875-.945a2.152 2.152 0 012.509.307 1.934 1.934 0 01.056 2.745l-.056.056a2.118 2.118 0 01-1.986.516 2.118 2.118 0 01-.928-.508 2.091 2.091 0 01-.562-.891z"
        fill={colors.tertiary}
      />
    </Svg>
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
  const { styles, colors } = useTheme<DemoTheme>();
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
            <PaperText style={styles.controlText}>{option.name}</PaperText>
            <Spacer />
            <RadioButton
              value={option.value}
              status={checked}
              color={colors.green}
              uncheckedColor={colors.inverseOnSurface}
            />
          </View>
        );
      })}
    </RadioButton.Group>
  );
};

export const Monitor = (props: {
  visible: boolean;
  label: string;
  type?: 'info' | 'warning';
  actions: {
    label: string;
    onPress: () => {};
  }[];
  children: any;
}) => {
  const { styles, colors } = useTheme<DemoTheme>();
  const { label, type } = props;

  const iconName = type === 'warning' ? 'alert-circle' : type === 'info' ? 'bell' : 'check';

  const monitorIconStyle =
    type === 'warning'
      ? [styles.monitorIcon, styles.monitorIconWarning]
      : type === 'info'
      ? [styles.monitorIcon, styles.monitorIconInfo]
      : styles.monitorIcon;

  const icon = () => (
    <View style={monitorIconStyle}>
      <Feather name={iconName} size={20} color={colors.inverseOnSurface} />
    </View>
  );

  return (
    <Banner
      theme={{
        colors: {
          primary: colors.inverseOnSurface,
        },
      }}
      style={styles.monitorContainer}
      visible={props.visible}
      icon={icon}
      actions={props.actions}>
      <View style={styles.monitorLabel}>
        <PaperText style={styles.monitorLabelText}>{label}</PaperText>
        {props.children}
      </View>
    </Banner>
  );
};
