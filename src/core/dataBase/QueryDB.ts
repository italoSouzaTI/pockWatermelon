import { database } from "@core/dataBase";
export function QueryDB() {
    const getDB = async (nomeTabela: String) => {
        try {
            const dadosTabela = database.collections.get(`${nomeTabela}`);
            const data = await dadosTabela.query().fetch();
            return data;
        } catch (error) {
            console.log(`Erro ao recuperar registro na tabela ${nomeTabela}:`, error);
            throw new Error("Error ao consultar dados da tabela", error);
        }
    };
    const updateDB = async (nomeTabela: string, clienteId: string, updates: Record<string, any>) => {
        try {
            const updateDB = await database.write(async () => {
                const dataDB = await database.collections.get(`${nomeTabela}`);
                const updateUniqueDB = dataDB.find(clienteId);
                return (await updateUniqueDB).update((ctx) => {
                    for (const [field, value] of Object.entries(updates)) {
                        if (field in ctx) {
                            ctx[field] = value;
                        } else {
                            console.log(`Campo ${field} não existe na tabela ${nomeTabela}`);
                        }
                    }
                    // ctx.updated_at = new Date().getTime();
                });
            });
            return updateDB;
        } catch (error) {
            console.log(`Erro ao atualizar registro na tabela ${nomeTabela}:`, error);
            throw new Error(`Erro ao atualizar registro: ${error.message}`);
        }
    };
    const deleteDadosTabela = async (nomeTabela: String) => {
        try {
            await database.write(async () => {
                const dadosTabela = database.collections.get(`${nomeTabela}`);
                await dadosTabela.query().destroyAllPermanently();
            });
        } catch {}
    };
    const insertDB = async (nomeTabela: string, data: T) => {
        try {
            return await database.write(async () => {
                const dataCurrent = await database.collections.get(nomeTabela).create((ctx) => {
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            ctx[key] = data[key];
                        }
                    }
                });
                return dataCurrent.id;
            });
        } catch (error) {
            console.log("Error ao inserir jornada clientes", error.message);
            throw new Error("Error ao inserir jornada clientes", error.message);
        }
    };
    return { insertDB, getDB, updateDB, deleteDadosTabela };
}
