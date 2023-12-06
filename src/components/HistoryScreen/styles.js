import { StyleSheet, PixelRatio } from "react-native";

export default styles = StyleSheet.create({
    modalSeparator: {
        alignSelf: "center",
        width: "95%",
        height: 1.5,
        backgroundColor: "grey",
        marginBottom: "2%",
    },

    introductionText: {
        textAlign: "center",
        fontSize: PixelRatio.getPixelSizeForLayoutSize(10.5),
        fontWeight: "bold",
        color: "white",
        marginTop: PixelRatio.getPixelSizeForLayoutSize(5),
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(5),
    },

    historyFilterContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: "2%",
    },

    historyFilterText: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(7),
        fontWeight: "bold",
        color: "white",
    },

    historyFilterButton: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: "2%",
        width: "40%",
        alignItems: "center",
    },

    historyFilterButtonSelected: {
        backgroundColor: "grey",
    },

    scrollview: {
        width: "100%",
        height: "100%",
        alignSelf: "center",
        padding: "2%",
    },

    historyItemContainer: {
        backgroundColor: "white",
        borderRadius: 20,
        width: "100%",
        padding: "2%",
        alignSelf: "center",
        marginBottom: "2%",
        display: "flex",
        flexDirection: "column",
    },

    historyText: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(6),
        color: "black",
        textAlign: "left",
        width: "100%",
        padding: "2%",
    },
});
