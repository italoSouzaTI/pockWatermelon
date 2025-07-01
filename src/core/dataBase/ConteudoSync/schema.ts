import { tableSchema } from "@nozbe/watermelondb";
import { ConteudoSyncTable } from "./tableName";

const EnderecoTableSchema = tableSchema({
  name: ConteudoSyncTable.enderecos,
  columns: [
    { name: 'usuario_id', type: 'string', isIndexed: true },
    { name: 'cidade', type: 'string' },
    { name: 'estado', type: 'string' },
  ],
});

const ProdutoTableSchema = tableSchema({
  name: ConteudoSyncTable.produtos,
  columns: [
    { name: 'nome', type: 'string' },
    { name: 'descricao', type: 'string' },
    { name: 'usuario_id', type: 'string', isIndexed: true },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
  ],
});


const UsuarioTableSchema = tableSchema({
  name: ConteudoSyncTable.usuarios,
  columns: [
    { name: 'nome', type: 'string' },
    { name: 'sobrenome', type: 'string' },
    { name: 'descricao', type: 'string' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
  ],
})

const OcorrenciaTableSchema = tableSchema({
  name: ConteudoSyncTable.ocorrencias,
  columns: [
    { name: 'titulo', type: 'string' },
    { name: 'descricao', type: 'string' },
    { name: 'data', type: 'number' },
  ],
});

const PedidoTableSchema = tableSchema({
  name: ConteudoSyncTable.pedidos,
  columns: [
    { name: 'titulo', type: 'string' },
    { name: 'observacoes', type: 'string' },
    { name: 'valor', type: 'number' },
    { name: 'data', type: 'number' }, // armazenado como timestamp
  ],
});

export default [
  EnderecoTableSchema,
  ProdutoTableSchema,
  UsuarioTableSchema,
  OcorrenciaTableSchema,
  PedidoTableSchema
]