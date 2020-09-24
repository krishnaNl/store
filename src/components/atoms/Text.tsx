import React, {ReactElement} from 'react';
import {
    Text as RNText,
    StyleSheet,
    TextProps,
    TextStyle,
} from 'react-native';

export type TextFieldType = 'label' | 'text' | 'title';
export type TextSizeType = 'small' | 'regular' | 'large';
export type FontWeightType = 'normal' | 'medium' | 'bold';

interface IStyle {
    labelSmall: TextStyle;
    labelRegular: TextStyle;
    textSmall: TextStyle;
    textRegular: TextStyle;
    textLarge: TextStyle;
    titleSmall: TextStyle;
    titleRegular: TextStyle;
}

const styles: IStyle = StyleSheet.create<IStyle>({
    labelSmall: {
        fontSize: 10,
        lineHeight: 14,
        textAlign: 'left',
    },
    labelRegular: {
        fontSize: 12,
        lineHeight: 18,
        textAlign: 'left',
    },
    textSmall: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'left',
    },
    textRegular: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'left',
    },
    textLarge: {
        fontSize: 18,
        lineHeight: 26,
        textAlign: 'left',
    },
    titleSmall: {
        fontSize: 22,
        lineHeight: 32,
        textAlign: 'left',
    },
    titleRegular: {
        fontSize: 32,
        lineHeight: 40,
        textAlign: 'left',
    },
});

interface IProps extends TextProps {
    children: string | React.ReactNode;
    type: TextSizeType;
    textType?: FontWeightType;
}

const Label = ({type, style, children, textType, ...props}: IProps): ReactElement<RNText> => {
    let defaultStyle: object = {};
    switch (type) {
        case 'small':
            defaultStyle = styles.labelSmall;
            break;
        case 'regular':
            defaultStyle = styles.labelRegular;
            break;
        default:
            defaultStyle = styles.labelSmall;
            break;
    }
    return <RNText style={[defaultStyle, style]} {...props} >{children}</RNText>;
};
const Text = ({type, style, children, textType, ...props}: IProps): ReactElement<RNText> => {
    let defaultStyle: object = {};
    switch (type) {
        case 'small':
            defaultStyle = styles.textSmall;
            break;
        case 'regular':
            defaultStyle = styles.textRegular;
            break;
        case 'large':
            defaultStyle = styles.textLarge;
            break;
        default:
            defaultStyle = styles.textSmall;
            break;
    }
    return <RNText style={[defaultStyle, style]} {...props}>{children}</RNText>;
};

const Title = ({type, style, children, textType, ...props}: IProps): ReactElement<RNText> => {
    let defaultStyle: object = {};
    switch (type) {
        case 'small':
            defaultStyle = styles.titleSmall;
            break;
        case 'regular':
            defaultStyle = styles.titleRegular;
            break;
        default:
            defaultStyle = styles.titleSmall;
            break;
    }
    return <RNText style={[defaultStyle, style]} {...props} >{children}</RNText>;
};

export {
    Label,
    Text,
    Title,
};
