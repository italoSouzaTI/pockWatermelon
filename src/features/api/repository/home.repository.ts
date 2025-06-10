import { database } from "@core/dataBase";
import { nameTable } from "@core/dataBase/nameTable";
import { QueryDB } from "@core/dataBase/QueryDB";
import { Q } from "@nozbe/watermelondb";
import { Alert } from "react-native";

export function HomeRepository() {
    const { getDB, insertDB, updateDB } = QueryDB();
    async function processandoDados(id: string, location: object) {
        try {
            console.log("id", id);
            console.log("location", location);
            const localizacao = await getDB(nameTable.localizacao);
            let params = {
                cliente_id: id,
                latitude_inicial: location.current.coords.latitude,
                longitude_inicial: location.current.coords.longitude,
                latitude_final: 0,
                longitude_final: 0,
                is_start: true,
            };
            if (localizacao.length == 0) {
                const resposta = await insertDB(nameTable.localizacao, params);
                Alert.alert("Sucesso", `Dado criado com suesso ${resposta}`);
            } else {
                const localizacaoCurrent = await database
                    .get(nameTable.localizacao)
                    .query(Q.where("cliente_id", id), Q.where("is_start", true))
                    .fetch();
                if (localizacaoCurrent.length) {
                    let paramsFinal = {
                        latitude_final: location.current.coords.latitude,
                        longitude_final: location.current.coords.longitude,
                        is_start: false,
                    };
                    await updateDB(nameTable.localizacao, localizacaoCurrent[0].id, paramsFinal);
                    Alert.alert("Sucesso", `Dado atualizado com suesso`);
                } else {
                    const resposta = await insertDB(nameTable.localizacao, params);
                    Alert.alert("Sucesso", `Dado croiado com suesso ${resposta}`);
                }
            }
        } catch (error) {
            throw new Error(`ErrorNão foi possivel precessar arquivo ${error}`);
        }
    }
    return {
        processandoDados,
    };
}
