import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation } from '@nozbe/watermelondb/decorators';
import { ConteudoSyncTable } from '../tableName';

export default class ProdutoModel extends Model {
  static table = ConteudoSyncTable.produtos;

  @relation(ConteudoSyncTable.usuarios, 'usuario_id') usuario!: any;

  @field('nome') nome!: string;
  @field('descricao') descricao!: string;
  @field('usuario_id') usuarioId!: string;
  @readonly @date('created_at') createdAt!: number;
  @readonly @date('updated_at') updatedAt!: number;
}