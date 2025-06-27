import { nameTable } from "@core/dataBase/nameTable";
import { QueryDB } from "@core/dataBase/QueryDB";
import { Alert } from "react-native";
import { Logrepository } from "./log.repository";

export function FormRepository() {
    const { insertDB } = QueryDB();
    const { criandoLog } = Logrepository();
    const inserirNovoForm = async (data: T) => {
        try {
            const resposta = await insertDB(nameTable.cliente, data);
            await criandoLog({
                action: "inserirNovoForm",
                details: { salvandoDB: { tabela: nameTable.cliente, dado: data } },
                screen: "form - FormRepository",
                created_at: new Date().getTime(),
            });
            // Alert.alert("Sucesso Item criado com sucesso.", resposta);
        } catch (error) {
            Alert.alert("Error", error);
        }
    };
    return {
        inserirNovoForm,
    };
}
