import React from "react";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {Label, Text} from "@components/atoms/Text";
import theme from "@styles/theme";

interface IProps {
    artworkUrl100: string;
    onPress: () => void;
}

class ResultItem extends React.Component<IProps, any> {
    render() {
        const { artworkUrl100, onPress} = this.props;
        const width = theme.viewport.width - 40;
        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Image source={{uri: artworkUrl100}} style={{width: width/3, height: width/2, borderRadius: 5}}/>
            </TouchableOpacity>
        )
    }

}

export default ResultItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: theme.colors.white,
        elevation: 5,
        marginHorizontal: 2,
        flex: 1,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical:5
    },
    subContainer: {
        padding: 10,
        flex: 1,
    }
})