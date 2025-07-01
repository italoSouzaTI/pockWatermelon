import { useState } from 'react';
import { Alert } from 'react-native';
import { database } from '@core/dataBase';
import { ConteudoSyncTable } from '@core/dataBase/ConteudoSync/tableName';
import PedidoModel from '@core/dataBase/ConteudoSync/models/pedidoModel';

export interface NovoPedidoInput {
  titulo: string;
  observacoes: string;
  valor: number;
  data: Date;
}

export function useCadastroPedido() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const salvarPedido = async (pedido: NovoPedidoInput): Promise<boolean> => {
    if (!pedido.titulo.trim()) {
      setError('O título é obrigatório');
      Alert.alert('Atenção', 'O título é obrigatório');
      return false;
    }

    setIsSaving(true);
    setError(null);

    try {
      await database.write(async () => {
        await database.get<PedidoModel>(ConteudoSyncTable.pedidos).create(p => {
          p.titulo = pedido.titulo;
          p.observacoes = pedido.observacoes;
          p.valor = pedido.valor;
          p.data = pedido.data;
        });
      });

      return true;
    } catch (e) {
      console.error('Erro ao salvar pedido:', e);
      setError('Erro ao salvar pedido');
      Alert.alert('Erro', 'Não foi possível salvar o pedido');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    salvarPedido,
    isSaving,
    error,
  };
}
