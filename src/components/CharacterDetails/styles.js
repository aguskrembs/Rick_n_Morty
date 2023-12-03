import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    modalContainer: {
        marginTop: "37%",
        borderRadius: 15,
        backgroundColor: "#333333",
        blurRadius: 90,
        flexShrink: 1,
    },

    detailSection: {
        marginBottom: 100,
    },

    characterDetailHeader: {
        fontSize: 24,
        fontWeight: "bold",
        color: "darkgrey",
    },

    characterDetailIcon: {
        resizeMode: "contain",
        aspectRatio: 0.7,
        height: undefined,
        width: undefined,
    },

    aliveStatus: {
        fontSize: 23,
        fontWeight: "bold",
        color: "lightgreen",
        alignSelf: "center",
    },

    deadStatus: {
        fontSize: 23,
        fontWeight: "bold",
        color: "red",
        alignSelf: "center",
    },

    characterDetailContainer: {
        flexDirection: "row",
        padding: "3%",
        flexWrap: "wrap",
    },

    modalSeparator: {
        alignSelf: "center",
        width: "95%",
        height: 1.5,
        backgroundColor: "grey",
        marginBottom: "2%",
    },

    characterInformationText: {
        display: "flex",
        fontSize: 23,
        fontWeight: "bold",
        color: "white",
        flexWrap: "wrap",
    },

    characteDetailContent: {
        flexDirection: "row",
    },

    closeButtonContainer: {
        position: "absolute",
        alignSelf: "flex-end",
        alignItems: "center",
        marginTop: "4%",
        marginRight: "10%",
        flexShrink: 1,
    },

    closeButton: {
        width: 40,
        height: 40,
    },

    modalImage: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        resizeMode: "contain",
        aspectRatio: 1,
        height: undefined,
        width: undefined,
    },

    detailedName: {
        fontSize: 36,
        fontWeight: "bold",
        margin: 10,
        color: "white",
        marginTop: 10,
    },

    commentTextInput: {
        backgroundColor: "white",
        height: 50,
        borderRadius: 10,
        marginRight: "5%",
        textAlign: "center",
        marginBottom: "2%",
        marginTop: "2%",
        fontSize: 15,
        fontWeight: "bold",
        width: "100%",
    },

    buttonContainer: {
        justifyContent: "space-evenly",
        width: "100%",
        margin: 0,
        alignSelf: "center",
        textAlign: "center",
        marginTop: "2%",
        marginBottom: "7%",
        display: "flex",
        flexDirection: "row",
    },

    saveButton: {
        justifyContent: "center",
        height: 40,
        width: 180,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "lightyellow",
    },

    saveButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
    },

    deleteButton: {
        justifyContent: "center",
        height: 40,
        width: 180,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "red",
    },

    deleteButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
    },
});
