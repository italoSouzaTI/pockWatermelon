import { Model, Relation } from "@nozbe/watermelondb";
import {
  text,
  field,
  readonly,
  date,
  children,
} from "@nozbe/watermelondb/decorators";

import { Associations } from "@nozbe/watermelondb/Model";
import EnderecoModel from "./enderecoModel";
import { ConteudoSyncTable } from "../tableName";

export class UsuarioModel extends Model {
  static table = ConteudoSyncTable.usuarios;

  static associations: Associations = {
    [ConteudoSyncTable.produtos]: { type: 'has_many', foreignKey: 'usuario_id' },
    [ConteudoSyncTable.enderecos]: { type: 'has_many', foreignKey: 'usuario_id' },
  };

  @text('nome') nome!: string;
  @field('sobrenome') sobrenome!: string;
  @field('descricao') descricao!: string;

  @readonly @date('created_at') createdAt!: number;
  @readonly @date('updated_at') updatedAt!: number;

  @children(ConteudoSyncTable.enderecos) enderecos!: Relation<EnderecoModel>;
}