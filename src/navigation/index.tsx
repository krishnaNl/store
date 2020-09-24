import 'react-native-gesture-handler';
import React from 'react';
import {Text, View} from "react-native";
import {RouteNames} from "@navigation/routes";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import SearchScreen from "../screen/SearchScreen";
import DetailsScreen from "../screen/DetailsScreen";

const Stack = createStackNavigator();

interface INavigationProps {
    count?: number;
    isLoggedIn?: boolean;
}


class Navigation extends React.Component<INavigationProps, any> {
    public render() {
        return (
            <View style={{flex: 1}}>
                <NavigationContainer>
                    {this.renderScreen()}
                </NavigationContainer>
            </View>
        );
    }

    private renderScreen() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name={RouteNames.searchScreen}
                    component={SearchScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={RouteNames.detailsScreen}
                    component={DetailsScreen}
                />
            </Stack.Navigator>
        )
    }


}


export default Navigation;