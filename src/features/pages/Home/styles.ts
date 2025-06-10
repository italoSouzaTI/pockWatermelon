import { StyleSheet } from "react-native";
export const HomeStyles = StyleSheet.create({
    card: {
        width: "100%",
        height: 80,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "gray",
        padding: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    btn: {
        borderRadius: 10,
        width: "30%",
        minHeight: 20,
        padding: 10,
        alignContent: "center",
        alignItems: "center",
    },
    send: {
        backgroundColor: "orange",
    },
    end: {
        backgroundColor: "red",
    },
});
