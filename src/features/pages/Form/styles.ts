import { StyleSheet } from "react-native";
export const FormStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 24,
    },
    Title: {
        fontSize: 22,
        fontWeight: "bold",
    },
    close: {
        right: 10,
    },
    row: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    send: {
        borderRadius: 25,
        width: "100%",
        height: 60,
        backgroundColor: "purple",
        alignItems: "center",
        justifyContent: "center",
    },
});
