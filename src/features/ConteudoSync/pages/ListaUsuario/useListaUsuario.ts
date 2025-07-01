import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { usuarioRepository } from '@features/Usuarios/api/usuario.repository';

interface UsuarioComEndereco {
  id: string;
  nome: string;
  sobrenome: string;
  descricao: string;
  cidade?: string;
  estado?: string;
}

export const useListaUsuario = () => {
  const repository = usuarioRepository();

  const [usuarios, setUsuarios] = useState<UsuarioComEndereco[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchUsuarios();
    }, [])
  )

  const fetchUsuarios = async () => {
    setLoading(true);

    try {
      const usuariosComEndereco = await repository.consultarUsuarios();
      setUsuarios(usuariosComEndereco);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  return { usuarios, loading };
};
