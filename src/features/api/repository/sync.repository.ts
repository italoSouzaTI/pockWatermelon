import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "@core/dataBase";
import { MIGRATION_VERSION } from "@core/dataBase/migrationVersion";
import { nameTable } from "@core/dataBase/nameTable";
export async function syncDB() {
    try {
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
                // Simulando uma resposta da API
                const mockResponse = {
                    changes: {
                        // Estrutura de exemplo para tabelas
                        cliente: {
                            created: [],
                            updated: [],
                            deleted: [],
                        },
                        localizacao: {
                            created: [],
                            updated: [],
                            deleted: [],
                        },
                        log: {
                            created: [],
                            updated: [],
                            deleted: [],
                        },
                    },
                    timestamp: Date.now(), // Usa o timestamp atual
                };

                return mockResponse;
            },
            pushChanges: async ({ changes, lastPulledAt }) => {
                console.log("pushChanges changes", changes);
                console.log("pushChanges lastPulledAt", lastPulledAt);
            },
            migrationsEnabledAtVersion: MIGRATION_VERSION,
        });
    } catch (error) {
        console.log("error sincronizar", error.message);
    }
}
