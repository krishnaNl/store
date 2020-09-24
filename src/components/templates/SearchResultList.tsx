import React from "react";
import {Product} from "../../domain/models/Product";
import {FlatList, View} from "react-native";
import ResultItem from "@components/organisms/ResultItem";
import {RouteNames} from "@navigation/routes";

interface IProps {
    data: Product[];
    navigation: any;
}

class SearchResultList extends React.Component<IProps, any> {


    render() {
        const {data} = this.props;
        console.log('data', data);
        return (
            <View style={{flex: 1, marginTop: 20}}>
                <FlatList
                    data={data}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    keyboardDismissMode={'on-drag'}
                    numColumns={3}
                />
            </View>
        )
    }

    private keyExtractor = (item: Product, index: number) => index.toString();
    private renderItem = ({item}: { item: Product, index: number }) => {
        const onPress = () => this.onPressItem(item);
        return (
            <ResultItem
                artworkUrl100={item.artworkUrl100}
                onPress={onPress}
            />
        )
    }

    private onPressItem = (item: Product) => {
        this.props.navigation.navigate(RouteNames.detailsScreen, {product: item})
    }

}

export default SearchResultList