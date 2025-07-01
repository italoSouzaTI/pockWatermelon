import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';
import { ConteudoSyncTable } from '../tableName';

export default class OcorrenciaModel extends Model {
  static table = ConteudoSyncTable.ocorrencias;

  @field('titulo') titulo!: string;
  @field('descricao') descricao!: string;
  @date('data') data!: Date;
}