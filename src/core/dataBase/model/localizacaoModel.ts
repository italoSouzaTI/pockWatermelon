import { Model } from "@nozbe/watermelondb";
import { field, readonly, date } from "@nozbe/watermelondb/decorators";
import { nameTable } from "../nameTable";

export default class localizacaoModel extends Model {
    static table = nameTable.localizacao;
    static associations = {
        [nameTable.cliente]: { type: "belongs_to", foreignKey: "cliente_id" },
    };
    @field("cliente_id") cliente_id!: string;
    @field("latitude_inicial") latitude_inicial!: number;
    @field("longitude_inicial") longitude_inicial!: number;
    @field("latitude_final") latitude_final!: number;
    @field("longitude_final") longitude_final!: number;
    @field("is_start") is_start!: boolean;
    @readonly @date("created_at") created_at!: number;
    @readonly @date("updated_at") updated_at!: number;
}
