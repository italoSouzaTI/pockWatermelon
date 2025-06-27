import { createTable, schemaMigrations } from "@nozbe/watermelondb/Schema/migrations";
import { nameTable } from "../nameTable";
import { MIGRATION_VERSION } from "../migrationVersion";

export default schemaMigrations({
    migrations: [
        {
            toVersion: 2,
            steps: [
                // See "Migrations API" for more details
                createTable({
                    name: nameTable.log,
                    columns: [
                        { name: "action", type: "string" },
                        { name: "details", type: "string" },
                        { name: "screen", type: "string" },
                        { name: "created_at", type: "number" },
                    ],
                }),
            ],
        },
    ],
});
