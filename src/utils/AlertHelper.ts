import React from 'react';
import {Alert, AlertButton, StyleSheet} from 'react-native';

interface IAlert {
  text: string;
  onPress?: () => void;
}

interface IToastMessage {
  title: string;
  message?: string;
  autoHide?: boolean;
  duration?: number;
  renderExtraView?: React.ReactNode;
}

// Default duration for flash messages
const defaultDuration = 1850;
class AlertHelper {
  public showAlert(title: string | undefined, message?: string | undefined, success?: IAlert, cancel?: IAlert): void {
    const button: AlertButton[] = [];
    if (cancel) {
      const cancelButton: AlertButton = {
        style: 'cancel',
        text: cancel.text,
        onPress: cancel.onPress,
      };
      button.push(cancelButton);
    }
    const successButton: AlertButton = {
      onPress: success ? success.onPress : () => {
        // onPress
      },
      text: success ? success.text : 'ok',
      style: 'default',
    };
    button.push(successButton);
    if (typeof title === 'string') {
      Alert.alert(title, message, button, {cancelable: false});
    }
  }
}

const alertHelper = new AlertHelper();
export {alertHelper as AlertHelper};
