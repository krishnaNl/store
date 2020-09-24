import React from 'react';
import {StyleSheet, KeyboardAvoidingView, View, SafeAreaView} from "react-native";
import theme from "@styles/theme";
import SearchBar from "@components/molecules/SearchBar";
import {Text} from "@components/atoms/Text";
import {ProductService} from "../services/ProductService";
import SearchResultList from "@components/templates/SearchResultList";

interface IState {
    searchText: string;
    loading: boolean;
    data: any[];
}

class SearchScreen extends React.Component<any, IState> {
    state = {
        searchText: '',
        loading: false,
        data: [],
    }

    render() {
        const {searchText, loading} = this.state;
        console.log('theme.viewport.height', theme.viewport.height)
        return (
            <SafeAreaView style={{flex: 1}}>
                <KeyboardAvoidingView style={styles.container}>
                    <SearchBar
                        searchString={searchText}
                        showBackArrow={false}
                        editable={true}
                        onChangeText={this.onTextChange}
                        onRightButtonPress={this.onRightButtonPress}
                        showIconRight={false}
                    />
                    {this.renderList()}
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    private renderLoading() {
        return (
            <View>
                <Text type={'large'}>loading</Text>
            </View>
        )
    }

    private renderList() {
        return (
            <View style={{flex: 1}}>
                <SearchResultList data={this.state.data} navigation={this.props.navigation}/>
            </View>
        )
    }

    private onTextChange = async (text: string) => {
        console.log('test', text);
        this.setState({searchText: text});
        await this.onSearchFromApi(text);
    }

    private onRightButtonPress = () => {
        this.setState({searchText: ''});
    }

    private onSearchFromApi = async (text: string) => {

        try {
            const response = await ProductService.getSearch(text);
            this.setState({data: response});
            console.log('response', response);
        } catch (e) {
            console.log('e', e);
        }
    }
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
        padding: 10,
    }
})