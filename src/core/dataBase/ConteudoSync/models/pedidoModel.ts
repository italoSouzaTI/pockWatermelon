import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';
import { ConteudoSyncTable } from '../tableName';

export default class PedidoModel extends Model {
  static table = ConteudoSyncTable.pedidos;

  @field('titulo') titulo!: string;
  @field('observacoes') observacoes!: string;
  @field('valor') valor!: number;
  @date('data') data!: Date;
}