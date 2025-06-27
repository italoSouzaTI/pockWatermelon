import { appSchema, tableSchema } from "@nozbe/watermelondb";
import { nameTable } from "../nameTable";
import { MIGRATION_VERSION } from "../migrationVersion";

export default appSchema({
    version: MIGRATION_VERSION,
    tables: [
        tableSchema({
            name: nameTable.cliente,
            columns: [
                { name: "nome", type: "string" },
                { name: "telefone", type: "string" },
            ],
        }),
        tableSchema({
            name: nameTable.localizacao,
            columns: [
                { name: "cliente_id", type: "string", isIndexed: true },
                { name: "latitude_inicial", type: "number" },
                { name: "longitude_inicial", type: "number" },
                { name: "latitude_final", type: "number", isOptional: true },
                { name: "longitude_final", type: "number", isOptional: true },
                { name: "is_start", type: "boolean" },
            ],
        }),
        tableSchema({
            name: nameTable.log,
            columns: [
                { name: "action", type: "string" },
                { name: "details", type: "string" },
                { name: "screen", type: "string" },
            ],
        }),
    ],
});
