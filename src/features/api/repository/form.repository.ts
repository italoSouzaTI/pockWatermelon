import { nameTable } from "@core/dataBase/nameTable";
import { QueryDB } from "@core/dataBase/QueryDB";
import { Alert } from "react-native";

export function FormRepository() {
    const { insertDB } = QueryDB();
    const inserirNovoForm = async (data: T) => {
        try {
            const resposta = await insertDB(nameTable.cliente, data);
            Alert.alert("Sucesso Item criado com sucesso.", resposta);
        } catch (error) {
            Alert.alert("Error", error);
        }
    };
    return {
        inserirNovoForm,
    };
}
