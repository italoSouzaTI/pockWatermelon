import { database } from "@core/dataBase";
import { NovoUsuarioInput } from "../pages/CadastroUsuario/useCadastroUsuario";
import { ConteudoSyncTable } from "@core/dataBase/ConteudoSync/tableName";
import { UsuarioModel } from "@core/dataBase/ConteudoSync/models/usuarioModel";
import EnderecoModel from "@core/dataBase/ConteudoSync/models/enderecoModel";

export const usuarioRepository = () => {
  const cadastrarUsuario = async (model: NovoUsuarioInput) => {
    await database.write(async () => {
      const novoUsuario = await database.get<UsuarioModel>(ConteudoSyncTable.usuarios).create(usuario => {
        usuario.nome = model.nome;
        usuario.sobrenome = model.sobrenome;
        usuario.descricao = model.descricao;
      });

      await database.get<EnderecoModel>(ConteudoSyncTable.enderecos).create(endereco => {
        endereco.usuario.set(novoUsuario);
        endereco.cidade = model.cidade;
        endereco.estado = model.estado;
      });
    });
  }

  const consultarUsuarios = async () => {
    const usuariosCollection = database.get<UsuarioModel>('usuarios');
    const listaUsuarios = await usuariosCollection.query().fetch();

    const usuariosComEndereco = await Promise.all(
      listaUsuarios.map(async usuario => {
        const enderecoList = (await usuario.enderecos.fetch()) as unknown as EnderecoModel[];
        const endereco = enderecoList[0];

        return {
          id: usuario.id,
          nome: usuario.nome,
          sobrenome: usuario.sobrenome,
          descricao: usuario.descricao,
          cidade: endereco?.cidade,
          estado: endereco?.estado,
        };
      })
    );

    return usuariosComEndereco;
  }

  return {
    cadastrarUsuario,
    consultarUsuarios
  }
}