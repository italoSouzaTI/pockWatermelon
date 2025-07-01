import { Model } from "@nozbe/watermelondb";
import { field, readonly, date } from "@nozbe/watermelondb/decorators";
import { nameTable } from "../nameTable";

export default class ClienteModel extends Model {
    static table = nameTable.cliente;
    static associations = {
        [nameTable.localizacao]: { type: "has_many", foreignKey: "cliente_id" },
    };
    @field("nome") nome!: string;
    @field("telefone") telefone!: string;
    @readonly @date("created_at") created_at!: number;
    @readonly @date("updated_at") updated_at!: number;
}
