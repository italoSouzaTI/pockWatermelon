
import { database } from '@core/dataBase';
import OcorrenciaModel from '@core/dataBase/ConteudoSync/models/ocorrenciaModel';
import { ConteudoSyncTable } from '@core/dataBase/ConteudoSync/tableName';
import { useState } from 'react';
import { Alert } from 'react-native';

export interface NovaOcorrenciaInput {
  titulo: string;
  descricao: string;
  data: Date;
}

export function useCadastroOcorrencia() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const salvarOcorrencia = async (ocorrencia: NovaOcorrenciaInput): Promise<boolean> => {
    if (!ocorrencia.titulo.trim()) {
      setError('O título é obrigatório');
      Alert.alert('Atenção', 'O título é obrigatório');
      return false;
    }

    setIsSaving(true);
    setError(null);

    try {
      await database.write(async () => {
        await database.get<OcorrenciaModel>(ConteudoSyncTable.ocorrencias).create(o => {
          o.titulo = ocorrencia.titulo;
          o.descricao = ocorrencia.descricao;
          o.data = ocorrencia.data;
        });
      });
      return true;
    } catch (e) {
      console.error('Erro ao salvar ocorrência:', e);
      setError('Erro ao salvar ocorrência');
      Alert.alert('Erro', 'Não foi possível salvar a ocorrência');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    salvarOcorrencia,
    isSaving,
    error,
  };
}
