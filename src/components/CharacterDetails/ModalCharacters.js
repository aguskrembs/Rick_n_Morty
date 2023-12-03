import React, { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Button,
} from "react-native";
import styles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import {
    charactersSelector,
    applyCommentToCharacter,
} from "../../slices/characters";

export default function CharacterDetails({ character, closeHandler }) {
    const dispatch = useDispatch();
    const { favouriteCharacters, favouriteCharactersId } =
        useSelector(charactersSelector);
    const [comment, setComment] = useState(character.comment);

    const favouriteCloseHandler = () => {
        dispatch(
            applyCommentToCharacter({ id: character.id, comment: comment })
        );
        closeHandler();
    };

    const deleteCommentHandler = () => {
        dispatch(applyCommentToCharacter({ id: character.id, comment: "" }));
        closeHandler();
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView style={styles.modalContainer}>
                <Image
                    style={styles.modalImage}
                    source={{ uri: character.image }}
                />

                <View style={styles.closeButtonContainer}>
                    <TouchableOpacity
                        onPress={() => closeHandler()}
                        style={styles.touchableIcon}
                    >
                        <Image
                            style={styles.closeButton}
                            source={require("../close_button_icon.png")}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.detailedName}>{character.name}</Text>

                <View style={styles.modalSeparator} />

                <View style={styles.detailSection}>
                    <View style={styles.characterDetailContainer}>
                        <Text style={styles.characterDetailHeader}>
                            {"Status: "}{" "}
                        </Text>

                        {character.status === "Alive" ? (
                            <>
                                <Image
                                    style={styles.characterDetailIcon}
                                    source={require("./green_heart.png")}
                                />
                                <Text style={styles.aliveStatus}>
                                    {" "}
                                    {character.status}
                                </Text>
                            </>
                        ) : (
                            <></>
                        )}
                        {character.status === "Dead" ? (
                            <>
                                <Image
                                    style={styles.characterDetailIcon}
                                    source={require("./rip.png")}
                                />
                                <Text style={styles.deadStatus}>
                                    {" "}
                                    {character.status}
                                </Text>
                            </>
                        ) : (
                            <></>
                        )}
                        {character.status === "unknown" ? (
                            <>
                                <Image
                                    style={styles.characterDetailIcon}
                                    source={require("./unknown_icon.png")}
                                />
                                <Text style={styles.characterInformationText}>
                                    {" "}
                                    {character.status}
                                </Text>
                            </>
                        ) : (
                            <></>
                        )}
                    </View>

                    <View style={styles.characterDetailContainer}>
                        <Text style={styles.characterDetailHeader}>
                            {"Gender: "}{" "}
                        </Text>
                        <View style={styles.characteDetailContent}>
                            {character.gender === "Male" ? (
                                <Image
                                    style={styles.characterDetailIcon}
                                    source={require("./male_icon.png")}
                                />
                            ) : (
                                <></>
                            )}
                            {character.gender === "Female" ? (
                                <Image
                                    style={styles.characterDetailIcon}
                                    source={require("./female_icon.png")}
                                />
                            ) : (
                                <></>
                            )}
                            {character.gender === "unknown" ? (
                                <Image
                                    style={styles.characterDetailIcon}
                                    source={require("./unknown_icon.png")}
                                />
                            ) : (
                                <></>
                            )}
                            <Text style={styles.characterInformationText}>
                                {" "}
                                {character.gender}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.characterDetailContainer}>
                        <Text style={styles.characterDetailHeader}>
                            {"Species: "}{" "}
                        </Text>
                        <View style={styles.characteDetailContent}>
                            <View>
                                <Text style={styles.characterInformationText}>
                                    {" "}
                                    {character.species}
                                </Text>
                                {character.type !== "" ? (
                                    <Text
                                        style={styles.characterInformationText}
                                    >
                                        {" "}
                                        ({character.type})
                                    </Text>
                                ) : (
                                    <></>
                                )}
                            </View>
                        </View>
                    </View>

                    <View style={styles.characterDetailContainer}>
                        <Text style={styles.characterDetailHeader}>
                            {"Origin: "}{" "}
                        </Text>
                        <View style={styles.characteDetailContent}>
                            <Text style={styles.characterInformationText}>
                                {" "}
                                {character.origin.name}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.characterDetailContainer}>
                        <Text style={styles.characterDetailHeader}>
                            {"Actual Location: "}{" "}
                        </Text>
                        <View>
                            <Text style={styles.characterInformationText}>
                                {" "}
                                {character.location.name}
                            </Text>
                        </View>
                    </View>

                    {favouriteCharactersId.includes(character.id) ? (
                        <>
                            <View style={styles.characterDetailContainer}>
                                <Text style={styles.characterDetailHeader}>
                                    {"Comment: "}{" "}
                                </Text>
                                <View style={styles.commentContainer}></View>
                                <View style={styles.textFilterContainer}>
                                    <TextInput
                                        style={styles.commentTextInput}
                                        placeholder={
                                            "Add a comment to this character"
                                        }
                                        placeholderTextColor="gray"
                                        value={comment}
                                        onChangeText={(comment) => {
                                            setComment(comment);
                                        }}
                                    />
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                favouriteCloseHandler();
                                            }}
                                            style={styles.saveButton}
                                        >
                                            <Text style={styles.saveButtonText}>
                                                Save comment
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => {
                                                deleteCommentHandler();
                                            }}
                                            style={styles.deleteButton}
                                        >
                                            <Text
                                                style={styles.deleteButtonText}
                                            >
                                                Delete comment
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </>
                    ) : null}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
