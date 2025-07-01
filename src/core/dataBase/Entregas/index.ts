import ClienteModel from "./model/clienteModel";
import localizacaoModel from "./model/localizacaoModel";
import schemaTable from "./schema";

export const schema = schemaTable;

export const models = [
  ClienteModel,
  localizacaoModel
]
