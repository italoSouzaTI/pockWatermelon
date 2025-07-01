import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { database } from "@core/dataBase";
import StackRoute from "src/routes/StackRoute/StackRoute";
if (__DEV__) {
    require("./ReactotronConfig");
}
export default function App() {
    useEffect(() => {
        database;
    }, []);
    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <StatusBar style="dark" />
                <StackRoute />
            </SafeAreaProvider>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
