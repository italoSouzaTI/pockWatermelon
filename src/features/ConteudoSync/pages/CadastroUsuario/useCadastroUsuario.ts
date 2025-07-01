import { database } from '@core/dataBase';
import { nameTable } from '@core/dataBase/Entregas/nameTable';
import { usuarioRepository } from '@features/ConteudoSync/api/usuario.repository';
import { useState } from 'react';
import { Alert } from 'react-native';


export interface NovoUsuarioInput {
  nome: string;
  sobrenome: string;
  descricao: string;
  cidade: string;
  estado: string;
}

export function useCadastroUsuario() {
  const repository = usuarioRepository();

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const salvarUsuario = async (usuario: NovoUsuarioInput): Promise<boolean> => {
    if (!usuario.nome.trim()) {
      setError('O nome é obrigatório');
      Alert.alert('Atenção', 'O nome é obrigatório');
      return false;
    }

    setIsSaving(true);
    setError(null);

    try {
      await repository.cadastrarUsuario(usuario);
      return true;
    } catch (e) {
      console.error('Erro ao salvar usuário:', e);
      setError('Erro ao salvar usuário');
      Alert.alert('Erro', 'Não foi possível salvar o usuário');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    salvarUsuario,
    isSaving,
    error,
  };
}
