import { tableSchema } from "@nozbe/watermelondb";
import { nameTable } from "./nameTable";

const ClienteSchema = tableSchema({
  name: nameTable.cliente,
  columns: [
    { name: "nome", type: "string" },
    { name: "telefone", type: "string" },
  ],
})

const LocalizacaoSchema = tableSchema({
  name: nameTable.localizacao,
  columns: [
    { name: "cliente_id", type: "string", isIndexed: true },
    { name: "latitude_inicial", type: "number" },
    { name: "longitude_inicial", type: "number" },
    { name: "latitude_final", type: "number", isOptional: true },
    { name: "longitude_final", type: "number", isOptional: true },
    { name: "is_start", type: "boolean" },
  ],
})

export default [
  ClienteSchema,
  LocalizacaoSchema
]