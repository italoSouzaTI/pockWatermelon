import { nameTable } from "@core/dataBase/nameTable";
import { QueryDB } from "@core/dataBase/QueryDB";
import { Alert } from "react-native";
type Logrepositoryprops = {
    action: string;
    details: object;
    screen: string;
};
export function Logrepository() {
    const { insertDB } = QueryDB();
    const criandoLog = async (params: Logrepositoryprops) => {
        try {
            const resposta = await insertDB(nameTable.log, params);
            // Alert.alert("Log criado com sucesso.", resposta);
        } catch (error) {}
    };
    return {
        criandoLog,
    };
}
