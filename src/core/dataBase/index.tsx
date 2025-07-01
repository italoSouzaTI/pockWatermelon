import { Alert, Platform } from "react-native";
import { appSchema, Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import * as ConteudoSync from './ConteudoSync';
import * as Entregas from './Entregas';

const schema = appSchema({
  version: 1,
  tables: [
    ...ConteudoSync.schema,
    ...Entregas.schema
  ],
});

const adapter = new SQLiteAdapter({
  schema,
  dbName: "pockWatermelon",
  jsi: Platform.OS === "ios" ? true : false,
  onSetUpError: (error) => {
    Alert.alert("Atenção", "Ocorreu um erro ao inciar dataBase.");
  },
});

export const database = new Database({
  adapter,
  modelClasses: [
    ...ConteudoSync.models,
    ...Entregas.models
  ],
});
