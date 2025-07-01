import { Model, Relation } from '@nozbe/watermelondb';
import { field,  immutableRelation } from '@nozbe/watermelondb/decorators';

import { UsuarioModel } from './usuarioModel';
import { ConteudoSyncTable } from '../tableName';

export default class EnderecoModel extends Model {
  static table = ConteudoSyncTable.enderecos;

  @field('cidade') cidade!: string;
  @field('estado') estado!: string;
  @field('usuario_id') usuarioId!: string;

  @immutableRelation(ConteudoSyncTable.usuarios, 'usuario_id') usuario!: Relation<UsuarioModel>;
}