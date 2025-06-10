import { Alert, Platform } from "react-native";
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import schema from "./model/schema";
import migrations from "./model/migrations";
import ClienteModel from "./model/clienteModel";
import localizacaoModel from "./model/localizacaoModel";
const adapter = new SQLiteAdapter({
    schema,
    migrations,
    dbName: "pockWatermelon",
    jsi: Platform.OS === "ios" ? true : false,
    onSetUpError: (error) => {
        Alert.alert("Atenção", "Ocorreu um erro ao inciar dataBase.");
        // Database failed to load -- offer the user to reload the app or log out
    },
});

// Then, make a Watermelon database from it!
export const database = new Database({
    adapter,
    modelClasses: [ClienteModel, localizacaoModel],
});
