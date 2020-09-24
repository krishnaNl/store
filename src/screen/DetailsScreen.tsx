import React from "react";
import {Label, Text, Title} from "@components/atoms/Text";
import {Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Product} from "../domain/models/Product";
import theme from "@styles/theme";

interface IProps {
    route: any;
}

class DetailsScreen extends React.Component<IProps, any> {

    render() {
        const product: Product = this.props.route.params.product;
        console.log('this.props', this.props.route.params.product);
        console.log('this.props', this.props.route.params.product);
        return (
            <SafeAreaView>
                <ScrollView>
                    <Image source={{uri: product.artworkUrl100}} style={styles.image}/>
                    {this.renderDetails(product)}
                </ScrollView>
            </SafeAreaView>
        );
    }

    private renderDetails(product: Product) {
        return (
            <View style={styles.detailsContainer}>
                <Text type={'large'}>{product.collectionName}</Text>
                <Label type={'regular'}>{product.artistName} | {product.date} </Label>
                <Text type={'small'} style={styles.textDec}>{product.longDescription}</Text>
            </View>
        )
    }
}

export default DetailsScreen;

const styles = StyleSheet.create({
    detailsContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    textDec: {
        textAlign: 'justify',
        paddingTop: 5,
        color: theme.colors.gray
    },
    image: {
        height: theme.viewport.width / 0.7,
        margin: 5,
        width: theme.viewport.width - 10
    }
})