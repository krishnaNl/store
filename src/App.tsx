/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
    View,
} from 'react-native';
import Navigation from "@navigation/index";

class App extends React.Component<any, any> {
    render() {
        return (
            <View style={{flex: 1}}>
                <Navigation/>
            </View>
        );
    }
}

export default App;
