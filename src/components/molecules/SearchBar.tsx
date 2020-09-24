import React from 'react';
import {
    Keyboard,
    NativeSyntheticEvent,
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputSubmitEditingEventData,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import {PlatformUtils} from "@utils/PlatformUtils";
import theme from "@styles/theme";
import {BackArrow} from "@components/atoms/BackArrow";
import {Button} from "@components/atoms/Button";
import Icon from 'react-native-vector-icons/FontAwesome';


type PointerEventType = 'box-none' | 'none' | 'box-only' | 'auto';

export interface ISearchBarProps {
    showBackArrow: boolean;
    editable: boolean;
    showIconRight?: boolean;
    autofocus?: boolean;
    searchHint?: string;
    searchString?: string;
    pointerEvents?: PointerEventType;
    containerStyle?: StyleProp<ViewStyle>;
    searchBarStyle?: StyleProp<ViewStyle>;
    onChangeText?: (text: string) => void;
    onViewPress?: () => void;
    onRightButtonPress?: () => void;
    onLeftButtonPress?: () => void;
    triggerModal?: (isVisible: boolean) => void;
    onSubmit?: (event: TextInputSubmitEditingEventData) => void;
    bubbleShowCancel?: (showCancel: boolean) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    ref?: (ref: any) => void;
    onTouchStart?: () => void;
    showCancel?: boolean;
    disableCancel?: boolean;
}

interface IState {
    showCancel: boolean;
}

const icon = PlatformUtils.isAndroid() ? 'clear' : 'cancel';

export class SearchBar extends React.PureComponent<ISearchBarProps, IState> {
    public textInput: any = null;
    public keyboardDidHideListener: any = null;
    public styles =
        createStyles(PlatformUtils.isIOS());

    public state = {
        showCancel: false,
    };

    public componentDidMount() {
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this.keyboardDidHide,
        );
    }

    public componentWillUnmount() {
        this.keyboardDidHideListener.remove();
    }

    public keyboardDidHide = () => {
        this.textInput.blur();
    }

    public handleTextChange = (value: string) => {
        const {onChangeText} = this.props;
        if (onChangeText) {
            onChangeText(value);
        }
        this.setState({showCancel: value.length < 1})
    }

    public onSubmit = (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        if (this.props.onSubmit) {
            this.props.onSubmit(event.nativeEvent);
            this.keyboardDidHide();
        }
    }

    public handleRightButtonClick = () => {
        const {searchString} = this.props;
        if (searchString && searchString.length > 0 && this.props.onRightButtonPress) {
            this.props.onRightButtonPress();
            this.onFocusTextInput();
        }
        if (searchString === '' && this.props.triggerModal) {
            this.props.triggerModal(true);
        }
    }

    public onFocusTextInput = () => {
        setTimeout(() => {
            if (this && this.textInput) {
                this.textInput.focus();
            }
        }, 500);
    }

    public onBackPressed = () => {
        if (this.props.onLeftButtonPress) {
            this.props.onLeftButtonPress();
        }
    }

    public onFocus = () => {
        const {onFocus} = this.props;
        if (onFocus) {
            onFocus();
        }
        this.updateShowCancel(true);
    }

    public onBlur = () => {
        const {onBlur} = this.props;
        if (onBlur) {
            onBlur();
        }
        this.updateShowCancel(false);
    }

    public updateShowCancel = (showCancel: boolean) => {
        if (PlatformUtils.isIOS()) {
            this.setState({showCancel}, () => {
                if (this.props.bubbleShowCancel) {
                    this.props.bubbleShowCancel(this.state.showCancel);
                }
            });
        }
    }

    public onCancel = () => {
        const {searchString} = this.props;
        this.textInput.blur();
        if (searchString && searchString.length > 0 && this.props.onRightButtonPress) {
            this.props.onRightButtonPress();
        }
    }

    public searchBarPlatformStyle = (): boolean => {
        return PlatformUtils.isIOS();
    }

    public render() {
        const {
            showBackArrow,
            onViewPress,
            searchString = '',
            containerStyle = {},
            searchBarStyle = {},
            showIconRight = true,
            disableCancel
        } = this.props;
        const iconRight: string = searchString.length === 0 ? 'mic' : icon;
        const iconColor = iconRight === 'mic' ? theme.colors.black : theme.colors.gray;
        const showCancel = disableCancel ? false : this.state.showCancel;
        const cancelStyles = showCancel ? this.styles.containerSearchOnCancel : {};
        const iosSearchBarStyle = [this.styles.containerSearch, cancelStyles, searchBarStyle];
        const androidSearchBarStyle = [this.styles.containerSearch, cancelStyles, searchBarStyle, this.styles.boxShadow];
        return (
            <TouchableOpacity
                onPress={onViewPress}
                activeOpacity={1}
                style={[this.styles.container, containerStyle]}
                accessible={false}
            >
                {showBackArrow && <BackArrow onBackPress={this.onBackPressed} style={this.styles.backArrow}/>}
                <View
                    style={this.searchBarPlatformStyle() ?
                        iosSearchBarStyle : androidSearchBarStyle}
                >
                    {this.renderIcon()}
                    {this.renderTextInput()}
                    {(showIconRight || (!showIconRight && searchString.length > 0)) &&
                    <Button
                        onPress={this.handleRightButtonClick}
                        type={'ghost'}
                        icon={'times-circle'}
                        iconSize={16}
                        iconColor={iconColor}
                        containerStyle={[this.styles.noBorder, this.styles.iconRight]}
                    />
                    }
                </View>
                {showCancel &&
                <Button
                    onPress={this.onCancel}
                    type={'ghost'}
                    title={'Cancel'}
                    containerStyle={this.styles.noBorder}
                    titleStyle={this.styles.cancelButtonTitle}
                    testIdButton={'btnCancel'}
                />
                }
            </TouchableOpacity>
        );
    }

    private renderIcon(): React.ReactNode {
        return (
            <Icon
                onPress={this.onFocusTextInput}
                name={'search'}
                size={PlatformUtils.isIOS() ? 16 : 24}
                color={PlatformUtils.isIOS()
                    ? theme.colors.gray
                    : theme.colors.black}
                style={this.styles.searchIcon}
            />
        );
    }

    private renderTextInput(): React.ReactNode {
        const {
            editable,
            searchString = '',
            pointerEvents,
            autofocus,
            searchHint,
        } = this.props;
        return (
            <TextInput
                ref={(input) => this.textInput = input}
                placeholder={searchHint ? searchHint : ''}
                placeholderTextColor={theme.colors.lightGray}
                onChangeText={this.handleTextChange}
                value={searchString}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                editable={editable}
                autoFocus={autofocus}
                autoCorrect={false}
                onSubmitEditing={this.onSubmit}
                blurOnSubmit={false}
                autoCapitalize={PlatformUtils.isAndroid() ? 'none' : 'sentences'}
                numberOfLines={1}
                returnKeyType={'search'}
                style={this.styles.textStyle}
                onTouchStart={this.props.onTouchStart}
                pointerEvents={pointerEvents}
            />
        );
    }
}

export default SearchBar;
const createStyles =
    (backgroundColorCheck: boolean = false) => {
        return StyleSheet.create({
            container: {
                backgroundColor: theme.colors.white,
                flexDirection: 'row',
                alignItems: 'center',
            },
            containerSearch: {
                flex: 1,
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: theme.colors.lightGray,
                alignItems: 'center',
                backgroundColor: backgroundColorCheck ?
                    theme.colors.white : theme.colors.white,
                marginHorizontal: 20,
                height: 48,
                borderRadius: 2,
                marginTop: PlatformUtils.isAndroid() ? 8 : undefined,
            },
            boxShadow: {
                shadowColor: theme.colors.black,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.08,
                shadowRadius: 2.62,
                elevation: 4,
            },
            containerSearchOnCancel: {
                marginHorizontal: 0,
                marginStart: 16,
            },
            textStyle: {
                alignSelf: PlatformUtils.isIOS() ? 'center' : undefined,
                flex: 1,
                color: theme.colors.jaguar,
                paddingVertical: 8,
                paddingHorizontal: 8,
                fontSize: 16,
            },
            backArrow: {
                marginStart: 16,
            },
            searchIcon: {
                paddingVertical: 8,
                paddingLeft: 8,
                paddingRight: 8,
            },
            noBorder: {
                borderWidth: 0,
            },
            iconRight: {
                paddingHorizontal: 12,
            },
            cancelButtonTitle: {
                color: theme.colors.primaryColor,
            },
        });
    };
