import { useEffect, useState } from "react";
import { database } from "@core/dataBase";
import { ConteudoSyncTable } from "@core/dataBase/ConteudoSync/tableName";
import { UsuarioModel } from "@core/dataBase/ConteudoSync/models/usuarioModel";
import PedidoModel from "@core/dataBase/ConteudoSync/models/pedidoModel";
import OcorrenciaModel from "@core/dataBase/ConteudoSync/models/ocorrenciaModel";

interface ListagemConteudo {
  usuarios: UsuarioModel[];
  pedidos: PedidoModel[];
  ocorrencias: OcorrenciaModel[];
}

export function useListaConteudo() {
  const [data, setData] = useState<ListagemConteudo>({
    usuarios: [],
    pedidos: [],
    ocorrencias: [],
  });

  const [loading, setLoading] = useState(true);

  const carregarDados = async () => {
    setLoading(true);

    const usuarios = await database
      .get<UsuarioModel>(ConteudoSyncTable.usuarios)
      .query()
      .fetch();
    const pedidos = await database
      .get<PedidoModel>(ConteudoSyncTable.pedidos)
      .query()
      .fetch();
    const ocorrencias = await database
      .get<OcorrenciaModel>(ConteudoSyncTable.ocorrencias)
      .query()
      .fetch();

    setData({ usuarios, pedidos, ocorrencias });
    setLoading(false);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return {
    ...data,
    loading,
    recarregar: carregarDados,
  };
}
