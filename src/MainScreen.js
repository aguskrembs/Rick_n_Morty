import React, { useEffect, useState } from "react";
import _debounce from "lodash/debounce";
import {
    Animated,
    Text,
    View,
    ActivityIndicator,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    PixelRatio,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HeaderBar from "./components/HeaderBar/headerBar";
import CharacterDetails from "./components/CharacterDetails/ModalCharacters";
import FilterScreenRenderer from "./components/Filter/FilterScreenRenderer";
import styles from "./appStyles";
import { useSelector, useDispatch } from "react-redux";
import { shakeAnimation } from "./components/Animation/shake";
import {
    fetchInitialCharacters,
    charactersSelector,
    fetchNewCharacters,
    fetchFilteredCharacters,
    addNewFavouriteCharacter,
    removeAFavouriteCharacter,
    fetchFavouriteCharacters,
} from "./slices/characters";

const AVATAR_SIZE = 150;
const SPACING = 20;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 2.5;
const HEIGHT = PixelRatio.getPixelSizeForLayoutSize(60);
const Drawer = createDrawerNavigator();

export default function mainScreen() {
    const dispatch = useDispatch();
    const {
        characters,
        favouriteCharacters,
        favouriteCharactersId,
        loading,
        hasErrors,
    } = useSelector(charactersSelector);

    useEffect(() => {
        dispatch(fetchFavouriteCharacters());
        dispatch(fetchInitialCharacters());
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [characterModal, setCharacterModal] = useState({});
    const [removedCharacterId, setRemovedCharacterId] = useState(-1);
    const [isFetching, setIsFetching] = useState(false);
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const animX = React.useRef(new Animated.Value(0)).current;
    const [debouncedOnEndReached, setDebouncedOnEndReached] = useState(
        _debounce(() => {
            if (!isFetching && !hasErrors) {
                setIsFetching(true);
                dispatch(fetchNewCharacters())
                    .then(() => {
                        setIsFetching(false);
                    })
                    .catch(() => {
                        setIsFetching(false);
                    });
            }
        }, 1000) // Adjust the delay as needed
    );

    const getNewCharactersFromAPI = () => {
        if (!isFetching) {
            setIsFetching(true);
            dispatch(fetchNewCharacters())
                .then(() => {
                    setIsFetching(false);
                })
                .catch(() => {
                    setIsFetching(false);
                });
        }
    };

    const pressHandler = (character) => {
        setShowModal(true);
        setCharacterModal(character);
    };

    const acceptHandler = (filterAttributes) => {
        setShowModal(false);
        setCharacterModal({});
        dispatch(fetchFilteredCharacters(filterAttributes));
    };

    const closeHandler = () => {
        setShowModal(false);
        setCharacterModal({});
    };

    const setFavouriteCharacter = (character) => {
        setRemovedCharacterId(character.id);
        shakeAnimation(animX, () => {
            dispatch(addNewFavouriteCharacter(character));
        });
    };

    const unsetFavouriteCharacter = (character) => {
        setRemovedCharacterId(character.id);
        shakeAnimation(animX, () => {
            dispatch(removeAFavouriteCharacter(character));
        });
    };

    function characterRender({ item, index }) {
        const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
        ];
        const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
        });

        return (
            <TouchableOpacity
                onPress={() => {
                    pressHandler(item);
                }}
            >
                <Animated.View
                    style={{
                        alignSelf: "center",
                        flexDirection: "row",
                        marginTop: SPACING,
                        backgroundColor: "rgba(0,0,0,0.8)",
                        borderRadius: 12,
                        height: HEIGHT,
                        width: "100%",
                        opacity,
                    }}
                >
                    <Image style={styles.image} source={{ uri: item.image }} />
                    <View style={styles.starContainer}>
                        {!favouriteCharactersId.includes(item.id) ? (
                            <TouchableOpacity
                                onPress={() => {
                                    setFavouriteCharacter(item);
                                }}
                            >
                                <Image
                                    style={styles.star}
                                    source={require("./components/white-star.png")}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => {
                                    unsetFavouriteCharacter(item);
                                }}
                            >
                                <Image
                                    style={styles.star}
                                    source={require("./components/yellow-star.png")}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.text}>{item.name}</Text>
                        <View style={styles.modalSeparator} />
                        {item.type == "" ? (
                            <View style={styles.detailsContainer}>
                                <Text style={styles.detailedText}>
                                    {item.species}
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.veryDetailedContainer}>
                                <Text style={styles.detailedText}>
                                    {item.species}
                                </Text>
                                <Text style={styles.detailedText}>
                                    {item.type}
                                </Text>
                            </View>
                        )}
                    </View>
                </Animated.View>
            </TouchableOpacity>
        );
    }

    function HomeScreen({ navigation }) {
        return (
            <SafeAreaView style={styles.SAVcontainer}>
                <HeaderBar closeHandler={closeHandler} />

                {loading ? (
                    <ActivityIndicator size="large" animating={loading} />
                ) : (
                    <Animated.FlatList
                        style={styles.flatlistStyle}
                        keyExtractor={(item) => item.id}
                        data={characters}
                        renderItem={characterRender}
                        onEndReached={debouncedOnEndReached}
                        contentContainerStyle={{
                            padding: SPACING,
                            paddingTop: 0,
                        }}
                    />
                )}

                <Modal
                    transparent={true}
                    visible={showModal}
                    animationType="slide"
                >
                    <CharacterDetails
                        character={characterModal}
                        closeHandler={closeHandler}
                    />
                </Modal>
            </SafeAreaView>
        );
    }

    function FilterScreen({ navigation }) {
        return (
            <SafeAreaView style={styles.SAVcontainer}>
                <HeaderBar closeHandler={closeHandler} />
                <FilterScreenRenderer
                    acceptHandler={acceptHandler}
                    closeHandler={closeHandler}
                />
            </SafeAreaView>
        );
    }

    function FavoritesScreen({ navigation }) {
        return (
            <SafeAreaView style={styles.SAVcontainer}>
                <HeaderBar closeHandler={closeHandler} />
                <Animated.FlatList
                    style={styles.flatlistStyle}
                    keyExtractor={(item) => item.id}
                    data={favouriteCharacters}
                    renderItem={characterRender}
                    contentContainerStyle={{
                        padding: SPACING,
                        paddingTop: 0,
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                />
                <Modal
                    transparent={true}
                    visible={showModal}
                    animationType="slide"
                >
                    <CharacterDetails
                        character={characterModal}
                        closeHandler={closeHandler}
                    />
                </Modal>
            </SafeAreaView>
        );
    }

    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: "black",
                    },
                    headerShown: false,
                    drawerActiveBackgroundColor: "lightyellow",
                    drawerLabelStyle: {
                        marginLeft: 25,
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "darkgrey",
                    },
                }}
                initialRouteName="HomeScreen"
            >
                <Drawer.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        headerTitle: () => <HeaderBar name="HomeScreen" />,
                    }}
                />

                <Drawer.Screen
                    name="FilterScreen"
                    component={FilterScreen}
                    options={{
                        headerTitle: () => <HeaderBar name="FilterScreen" />,
                    }}
                />
                <Drawer.Screen
                    name="FavoritesScreen"
                    component={FavoritesScreen}
                    options={{
                        headerTitle: () => <HeaderBar name="FavoritesScreen" />,
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
