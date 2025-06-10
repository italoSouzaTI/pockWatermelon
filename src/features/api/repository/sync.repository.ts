import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "@core/dataBase";
export async function syncDB() {
    try {
        await synchronize({
            database,
            pushChanges: async ({ changes, lastPulledAt }) => {
                console.log("pushChanges changes", changes);
                console.log("pushChanges lastPulledAt", lastPulledAt);
                //   const response = await fetch(`https://my.backend/sync?last_pulled_at=${lastPulledAt}`, {
                //     method: 'POST',
                //     body: JSON.stringify(changes),
                //   })
                //   if (!response.ok) {
                //     throw new Error(await response.text())
                //   }
            },
            migrationsEnabledAtVersion: 1,
        });
    } catch (error) {}
}
