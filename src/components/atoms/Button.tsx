import React, {ReactElement} from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  ImageStyle,
  TouchableNativeFeedback,
  TouchableOpacity,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {debounce} from 'lodash';
import theme from "@styles/theme";
import {PlatformUtils} from "@utils/PlatformUtils";
import {Label, Text, Title} from "@components/atoms/Text";
import {StyleUtils} from "@utils/StyleUtils";
import Icon from "react-native-vector-icons/FontAwesome";

export type ButtonType = 'filled' | 'ghost' | 'rounded' | 'link';

export interface IButtonProps {
  title?: any;
  onPress?: (event?: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  containerDisabledStyle?: {};
  disabled?: boolean;
  type?: ButtonType;
  textFieldType?: any;
  textType?: any;
  size?: any;
  iconRight?: boolean;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  testIdButton?: string;
  testIdIcon?: string;
  testIdTitle?: string;
  image?: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
  numberOfLines?: number;
  touchableStyle?: ViewStyle;
  adjustsFontSizeToFit?: boolean;
  dropDownWithImage?: boolean;
}

export class Button extends React.PureComponent<IButtonProps, {}> {

  public render(): ReactElement<View> {
    const {
      title,
      icon,
      onPress,
      containerStyle,
      titleStyle,
      iconStyle,
      type = 'filled',
      size = 'regular',
      iconRight = false,
      iconSize = 15,
      disabled = false,
      iconColor = type === 'filled' ? theme.colors.white : theme.colors.black,
      testIdButton = 'testIdButton',
      testIdIcon = 'testIdIcon',
      testIdTitle = 'testIdTitle',
      image = null,
      imageStyle = {},
      containerDisabledStyle = {},
      textType = 'normal',
      textFieldType = 'text',
      numberOfLines = 1,
      touchableStyle = {},
      adjustsFontSizeToFit = false,
    } = this.props;

    const Touchable = PlatformUtils.isAndroid() ? TouchableNativeFeedback : TouchableOpacity;
    let TextField = null;
    switch (textFieldType) {
      case 'label':
        TextField = Label;
        break;
      case 'title':
        TextField = Title;
        break;
      default:
        TextField = Text;
        break;
    }

    const debouncePress = () => {
      return onPress && onPress();
    };

    const touchableProps = PlatformUtils.isAndroid()
      ? {background: TouchableNativeFeedback.SelectableBackground()}
      : {activeOpacity: 0.8};

    const onPressButton = debounce(debouncePress, 100);

    return (
      // @ts-ignore
      <Touchable
        disabled={disabled}
        onPress={onPressButton}
        {...touchableProps}
        style={touchableStyle}
      >
        <View
          style={StyleSheet.flatten([
            styles.containerStyle(type, size, iconRight, icon),
            styles.disabled(disabled),
            StyleUtils.conditionalStyle(disabled, containerDisabledStyle),
            containerStyle,
          ])}
        >
          {icon &&
          <Icon
            name={icon}
            size={iconSize}
            color={disabled ? '#cccccc' : iconColor}
            style={[styles.iconStyle, iconStyle]}
          />
          }
          {title &&
          <TextField
            type={size}
            textType={textType}
            numberOfLines={numberOfLines}
            adjustsFontSizeToFit={adjustsFontSizeToFit}
            style={StyleSheet.flatten([styles.title(type),
              titleStyle, styles.disabledTitle(disabled),
              StyleUtils.conditionalStyle(disabled, containerDisabledStyle),
            ])}
          >
            {title}
          </TextField>
          }
          {image &&
          <Image resizeMode={'cover'} source={image} style={imageStyle}/>
          }
        </View>
      </Touchable>
    );
  }
}

const styles = {
  containerStyle: (type: string, size: string, iconRight: boolean, icon: string | undefined) => ({
    paddingHorizontal: size === 'regular' ? 16 : 8,
    paddingVertical: size === 'regular' ? 8 : 4,
    backgroundColor: type === 'filled' ? theme.colors.black : 'transparent',
    flexDirection: iconRight ? 'row-reverse' : 'row',
    justifyContent: icon ? 'space-between' : 'center',
    alignItems: 'center',
    borderRadius: type === 'rounded' ? 25 : 2,
    borderWidth: type === 'ghost' || type === 'rounded' ? StyleSheet.hairlineWidth : 0,
    borderColor: theme.colors.black,
  }),
  title: (type: string) => ({
    color: type === 'filled' ? 'white' : theme.colors.black,
    textAlign: 'center',
    paddingVertical: 5,
  }),
  disabled: (disabled: boolean) => ({
    ...StyleUtils.conditionalStyle(disabled, {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    }),
  }),
  disabledTitle: (disabled: boolean) => ({
    ...StyleUtils.conditionalStyle(disabled, {
      color: '#cccccc',
    }),
  }),
  iconStyle: {
    paddingHorizontal: 2,
  },
};
