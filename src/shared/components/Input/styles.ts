import { StyleSheet } from "react-native";

export const InputStyles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        gap: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        height: 45,
        borderRadius: 4,
        borderColor: "gray",
        borderWidth: 1,
        paddingHorizontal: 16,
    },
});
