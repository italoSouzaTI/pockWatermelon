import { database } from "@core/dataBase";
import { nameTable } from "@core/dataBase/nameTable";
import { QueryDB } from "@core/dataBase/QueryDB";
import { Q } from "@nozbe/watermelondb";
import { Alert } from "react-native";
import { Logrepository } from "./log.repository";

export function HomeRepository() {
    const { getDB, insertDB, updateDB } = QueryDB();
    const { criandoLog } = Logrepository();
    async function processandoDados(id: string, location: object) {
        try {
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
                let logParams = {
                    action: "processandoDados",
                    details: {
                        details: "Criando primeiro de todos - criando",
                        components: "Botão entrega",
                        processandoDados: { tabela: nameTable.localizacao, params },
                        created_at: new Date().getTime(),
                    },
                    screen: "Home",
                };
                await criandoLog(logParams);
                // Alert.alert("Sucesso", `Dado criado com suesso ${resposta}`);
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
                    let logParams = {
                        action: "processandoDados",
                        details: {
                            details: "Criando primeiro de todos - finalizando",
                            components: "Botão entrega",
                            processandoDados: { tabela: nameTable.localizacao, paramsFinal },
                            created_at: new Date().getTime(),
                        },
                        screen: "Home",
                    };
                    await criandoLog(logParams);
                    // Alert.alert("Sucesso", `Dado atualizado com suesso`);
                } else {
                    const resposta = await insertDB(nameTable.localizacao, params);
                    let logParams = {
                        action: "processandoDados",
                        details: {
                            details: "Criando primeiro de todos - criando um novo",
                            components: "Botão entrega",
                            processandoDados: { tabela: nameTable.localizacao, params },
                            created_at: new Date().getTime(),
                        },
                        screen: "Home",
                    };
                    await criandoLog(logParams);
                    // Alert.alert("Sucesso", `Dado croiado com suesso ${resposta}`);
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
