import { Model } from "@nozbe/watermelondb";
import { field, readonly, json } from "@nozbe/watermelondb/decorators";
import { nameTable } from "../nameTable";

export default class logModel extends Model {
    static table = nameTable.log;
    @field("action") action!: string;
    @json("details", (json) => json, (json) => JSON.stringify(json)) details!: string;
    @field("screen") screen!: string;
    @readonly @field("created_at") created_at!: number;
    // Método para obter como Date
    get createdDate(): Date {
        return new Date(this.created_at);
    }
}
