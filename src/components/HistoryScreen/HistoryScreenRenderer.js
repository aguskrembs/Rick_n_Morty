import React from "react";
import { useState, useEffect } from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCommentHistory,
    fetchHistory,
    historySelector,
} from "../../slices/history";

export default function FilterScreen({ closeHandler, acceptHandler }) {
    const [historyFilter, setHistoryFilter] = useState("Comments");

    const dispatch = useDispatch();
    const { favouriteHistory, commentHistory, loading, hasErrors } =
        useSelector(historySelector);

    useEffect(() => {
        dispatch(fetchHistory());
        dispatch(fetchCommentHistory());
    }, []);

    const currentHistory =
        historyFilter === "Favourites" ? favouriteHistory : commentHistory;

    return (
        <>
            <Text style={styles.introductionText}>HISTORY:</Text>

            <View style={styles.historyFilterContainer}>
                <TouchableOpacity
                    style={[
                        styles.historyFilterButton,
                        {
                            backgroundColor:
                                historyFilter === "Favourites"
                                    ? "white"
                                    : "gray",
                        },
                    ]}
                    onPress={() => {
                        setHistoryFilter("Favourites");
                    }}
                >
                    <Text style={styles.historyFilterButtonText}>
                        Favourites
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.historyFilterButton,
                        {
                            backgroundColor:
                                historyFilter === "Comments" ? "white" : "gray",
                        },
                    ]}
                    onPress={() => {
                        setHistoryFilter("Comments");
                    }}
                >
                    <Text style={styles.historyFilterButtonText}>Comments</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.modalSeparator} />

            <ScrollView style={styles.scrollview}>
                {currentHistory
                    .slice()
                    .reverse()
                    .map((item) => (
                        <View
                            key={item.itemID}
                            style={styles.historyItemContainer}
                        >
                            <Text style={styles.historyText}>
                                Time: {new Date(item.timestamp).toUTCString()}
                            </Text>
                            <Text style={styles.historyText}>
                                Event: {item.eventType}
                            </Text>
                            <Text style={styles.historyText}>
                                Detail: {item.detail}
                            </Text>
                        </View>
                    ))}
            </ScrollView>
        </>
    );
}
