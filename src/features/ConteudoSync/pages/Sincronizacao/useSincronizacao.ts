import { useState, useEffect } from "react";
import { database } from "@core/dataBase";
import { synchronize } from "@nozbe/watermelondb/sync";
import { ConteudoSyncTable } from "@core/dataBase/ConteudoSync/tableName";

export function useSincronizacao() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [counts, setCounts] = useState({
    usuarios: 0,
    pedidos: 0,
    ocorrencias: 0,
  });

  useEffect(() => {
    atualizarContadores();
  }, []);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const syncAll = async () => {
    await syncUsuarios();
    await syncPedidos();
    await syncOcorrencias();
  };

  const syncUsuarios = () => syncTipo(ConteudoSyncTable.usuarios);
  const syncPedidos = () => syncTipo(ConteudoSyncTable.pedidos);
  const syncOcorrencias = () => syncTipo(ConteudoSyncTable.ocorrencias);

  const syncTipo = async (tipo: keyof typeof ConteudoSyncTable) => {
    setIsSyncing(true);
    setError(null);

    try {
      await synchronize({
        database,
        pullChanges: async () => {
          return { changes: {}, timestamp: Date.now() };
        },
        pushChanges: async ({ changes }) => {
          const items = changes[tipo];

          if (items?.created?.length) {
            for (const item of items.created) {
              try {
                await delay(1000);
                await marcarComoSincronizado(tipo, item.id);
              } catch (e) {
                console.error(
                  `Erro ao sincronizar ${tipo} com id ${item.id}`,
                  e
                );
              }
            }
          }
        },
        unsafeTurbo: false
      });

      await atualizarContadores();
    } catch (e) {
      console.error(e);
      setError("Erro na sincronização");
    } finally {
      setIsSyncing(false);
    }
  };

  const marcarComoSincronizado = async (
    tipo: keyof typeof ConteudoSyncTable,
    id: string
  ) => {
    const record = await database.get(tipo).find(id);
    await database.write(async () => {
      record._raw._status = "synced";
      record._raw._changed = "";
    });
  };

  const atualizarContadores = async () => {
    const usuarios = await database
      .get(ConteudoSyncTable.usuarios)
      .query()
      .fetch();
      
    const pedidos = await database
      .get(ConteudoSyncTable.pedidos)
      .query()
      .fetch();

    const ocorrencias = await database
      .get(ConteudoSyncTable.ocorrencias)
      .query()
      .fetch();

    setCounts({
      usuarios: usuarios.filter((u) => u._raw._status !== "synced").length,
      pedidos: pedidos.filter((p) => p._raw._status !== "synced").length,
      ocorrencias: ocorrencias.filter((o) => o._raw._status !== "synced")
        .length,
    });
  };

  return {
    isSyncing,
    error,
    counts,
    syncUsuarios,
    syncPedidos,
    syncOcorrencias,
    syncAll,
  };
}
