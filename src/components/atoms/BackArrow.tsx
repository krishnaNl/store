import React from 'react';
import {GestureResponderEvent, Image, Platform, StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {Button} from '@components/atoms/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {PlatformUtils} from "@utils/PlatformUtils";
import theme from "@styles/theme";

interface IProps {
    onBackPress: (event?: GestureResponderEvent) => void;
    style?: StyleProp<ViewStyle>;
    displayCross?: boolean;
    displayCrossColor?: string;
}

export const BackArrow = (props: IProps) => {
    const {onBackPress, style, displayCross, displayCrossColor} = props;

    if (!displayCross) {
        return (
            <TouchableOpacity onPress={onBackPress} style={[styles.container, style]}>
                PlatformUtils.isIOS() &&
                <Icon size={24} name={'rocket'}/>
            </TouchableOpacity>
        );
    }

    const crossColor = displayCrossColor ? displayCrossColor : theme.colors.white;

    return (
        <React.Fragment>
            {PlatformUtils.isAndroid()
                ?
                <TouchableOpacity onPress={onBackPress} style={[styles.container, style]}>
                    <Icon size={24} name={'clear'} color={crossColor}/>
                </TouchableOpacity>
                :
                <Button
                    type={'link'}
                    title={'close'}
                    onPress={onBackPress}
                    titleStyle={styles.buttonTitle}
                    containerStyle={styles.buttonStyle}
                    testIdButton={'btnClose'}
                    testIdTitle={'txtClose'}
                />
            }
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        width: (theme.viewport.width * 0.064),
    },
    buttonTitle: {
        color: PlatformUtils.isAndroid() ? theme.colors.white : theme.colors.primaryColor,
        paddingVertical: 0,
    },
    buttonStyle: {
        paddingHorizontal: 0,
    },
    imageAsset: {
        width: 24,
        height: 24,
    },
});
