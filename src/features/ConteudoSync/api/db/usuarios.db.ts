import { database } from "@core/dataBase";
import EnderecoModel from "@core/dataBase/model/enderecoModel";
import { UsuarioModel } from "@core/dataBase/model/usuarioModel";
import { nameTable } from "@core/dataBase/Entregas/nameTable";
import { NovoUsuarioInput } from "@features/Usuarios/pages/CadastroUsuario/useCadastroUsuario";

export const cadastrarUsuarioDb = async (model: NovoUsuarioInput) => {
  await database.write(async () => {
    const novoUsuario = await database.get<UsuarioModel>(nameTable.usuarios).create(usuario => {
      usuario.nome = model.nome;
      usuario.sobrenome = model.sobrenome;
      usuario.descricao = model.descricao;
    });

    await database.get<EnderecoModel>(nameTable.enderecos).create(endereco => {
      endereco.usuario.set(novoUsuario);
      endereco.cidade = model.cidade;
      endereco.estado = model.estado;
    });
  });
}