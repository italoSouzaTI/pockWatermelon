import EnderecoModel from "./models/enderecoModel";
import OcorrenciaModel from "./models/ocorrenciaModel";
import PedidoModel from "./models/pedidoModel";
import ProdutoModel from "./models/produtoModel";
import { UsuarioModel } from "./models/usuarioModel";

import schemaTable from "./schema";

export const models = [
  EnderecoModel,
  ProdutoModel,
  UsuarioModel,
  OcorrenciaModel,
  PedidoModel
]

export const schema = schemaTable;
