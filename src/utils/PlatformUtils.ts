import {Platform} from 'react-native';

const isAndroid = (): boolean => {
    return Platform.OS === 'android';
};

const isIOS = (): boolean => {
    return Platform.OS === 'ios';
};

export const PlatformUtils = {
    isAndroid,
    isIOS,
};
